'use client';

import { useState } from 'react';
import { FAQ } from '@/types/faq';
import styles from './ExportButton.module.css';

interface ExportButtonProps {
  faqs: FAQ[];
}

type ExportFormat = 'json' | 'csv' | 'markdown';

export default function ExportButton({ faqs }: ExportButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [exporting, setExporting] = useState(false);

  const exportAsJSON = () => {
    const data = JSON.stringify(faqs, null, 2);
    downloadFile(data, 'faqs.json', 'application/json');
  };

  const exportAsCSV = () => {
    const headers = ['ID', 'Category', 'Question', 'Answer'];
    const rows = faqs.map((faq) => [
      faq.id,
      faq.category || 'General',
      `"${faq.question.replace(/"/g, '""')}"`,
      `"${faq.answer.replace(/"/g, '""')}"`,
    ]);

    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    downloadFile(csv, 'faqs.csv', 'text/csv');
  };

  const exportAsMarkdown = () => {
    const faqsByCategory = faqs.reduce((acc, faq) => {
      const category = faq.category || 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(faq);
      return acc;
    }, {} as Record<string, FAQ[]>);

    let markdown = '# Frequently Asked Questions\n\n';
    markdown += '*Amboseli Safari Club*\n\n';
    markdown += `*Exported: ${new Date().toLocaleDateString()}*\n\n`;
    markdown += '---\n\n';

    Object.entries(faqsByCategory).forEach(([category, categoryFaqs]) => {
      markdown += `## ${category}\n\n`;
      categoryFaqs.forEach((faq) => {
        markdown += `### ${faq.question}\n\n`;
        markdown += `${faq.answer}\n\n`;
      });
    });

    downloadFile(markdown, 'faqs.md', 'text/markdown');
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    setExporting(true);

    setTimeout(() => {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setExporting(false);
      setShowMenu(false);
    }, 500);
  };

  const handleExport = (format: ExportFormat) => {
    switch (format) {
      case 'json':
        exportAsJSON();
        break;
      case 'csv':
        exportAsCSV();
        break;
      case 'markdown':
        exportAsMarkdown();
        break;
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.exportButton}
        onClick={() => setShowMenu(!showMenu)}
        disabled={exporting}
        aria-label="Export FAQs"
        aria-expanded={showMenu}
        aria-haspopup="menu"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M18 13V17C18 17.5304 17.7893 18.0391 17.4142 18.4142C17.0391 18.7893 16.5304 19 16 19H4C3.46957 19 2.96086 18.7893 2.58579 18.4142C2.21071 18.0391 2 17.5304 2 17V13M14 6L10 2M10 2L6 6M10 2V13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>{exporting ? 'Exporting...' : 'Export'}</span>
      </button>

      {showMenu && !exporting && (
        <div className={styles.menu} role="menu">
          <button
            className={styles.menuItem}
            onClick={() => handleExport('json')}
            role="menuitem"
          >
            <span className={styles.menuIcon}>📄</span>
            <span className={styles.menuText}>
              <strong>JSON</strong>
              <small>Structured data format</small>
            </span>
          </button>
          <button
            className={styles.menuItem}
            onClick={() => handleExport('csv')}
            role="menuitem"
          >
            <span className={styles.menuIcon}>📊</span>
            <span className={styles.menuText}>
              <strong>CSV</strong>
              <small>Spreadsheet format</small>
            </span>
          </button>
          <button
            className={styles.menuItem}
            onClick={() => handleExport('markdown')}
            role="menuitem"
          >
            <span className={styles.menuIcon}>📝</span>
            <span className={styles.menuText}>
              <strong>Markdown</strong>
              <small>Readable text format</small>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
