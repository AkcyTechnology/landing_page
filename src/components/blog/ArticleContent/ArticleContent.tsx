import Image from "next/image";
import { getT } from "@/i18n/server";

import type { ContentBlock } from "@/data/blog";
import { parseInlineMarkdown } from "./inlineMarkdown";
import { slugify } from "./headings";
import CopyCodeButton from "./CopyCodeButton";
import VideoEmbed from "./VideoEmbed";

import styles from "./ArticleContent.module.scss";

interface ArticleContentProps {
  blocks: ContentBlock[];
}

export default function ArticleContent({ blocks }: ArticleContentProps) {
  return (
    <article className={styles.article}>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </article>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className={styles.paragraph}>{parseInlineMarkdown(block.text)}</p>;

    case "h2":
      return (
        <h2 id={block.id ?? slugify(block.text)} className={styles.h2}>
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3 id={block.id ?? slugify(block.text)} className={styles.h3}>
          {block.text}
        </h3>
      );

    case "list": {
      const items = block.items.map((item, index) => (
        <li key={index}>{parseInlineMarkdown(item)}</li>
      ));

      return block.style === "ordered" ? (
        <ol className={styles.list}>{items}</ol>
      ) : (
        <ul className={styles.list}>{items}</ul>
      );
    }

    case "quote":
      return (
        <blockquote className={styles.quote}>
          <span className={styles.quoteMark} aria-hidden="true">
            “
          </span>
          <p>{parseInlineMarkdown(block.text)}</p>
          {block.cite && <cite>{block.cite}</cite>}
        </blockquote>
      );

    case "image":
      return (
        <figure className={styles.image}>
          <div className={styles.imageFrame}>
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="760px"
              className={styles.imageEl}
            />
          </div>
          {block.caption && (
            <figcaption>{block.caption}</figcaption>
          )}
        </figure>
      );

    case "gallery":
      return (
        <figure className={styles.gallery}>
          <div className={styles.galleryGrid}>
            {block.images.map((image, index) => (
              <div key={index} className={styles.imageFrame}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="380px"
                  className={styles.imageEl}
                />
              </div>
            ))}
          </div>
          {block.caption && (
            <figcaption>{block.caption}</figcaption>
          )}
        </figure>
      );

    case "code":
      return (
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.codeTitle}>
              <i className={styles.dots} aria-hidden="true">
                <b />
                <b />
                <b />
              </i>
              {block.filename ?? block.language}
            </span>
            <CopyCodeButton code={block.code} />
          </div>
          <pre>
            <code>{block.code}</code>
          </pre>
        </div>
      );

    case "callout":
      return (
        <div
          className={`${styles.callout} ${
            block.variant === "note" ? styles.calloutNote : ""
          }`}
        >
          <span className={styles.calloutIcon} aria-hidden="true">
            {block.variant === "info" ? "i" : "!"}
          </span>
          <div>
            <span className={styles.calloutLabel}>
              {block.variant === "info" ? getT().blog.article.tip : getT().blog.article.note}
            </span>
            <p>{parseInlineMarkdown(block.text)}</p>
          </div>
        </div>
      );

    case "video":
      return <VideoEmbed provider={block.provider} videoId={block.videoId} caption={block.caption} />;

    case "table":
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {block.headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "divider":
      return <hr className={styles.divider} />;

    default:
      return null;
  }
}
