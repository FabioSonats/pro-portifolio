import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const PREVIEW_COUNT = 4;

interface BlogReferencesProps {
  items: string[];
}

const BlogReferences = ({ items }: BlogReferencesProps) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  const shown = expanded ? items : items.slice(0, PREVIEW_COUNT);
  const hasMore = items.length > PREVIEW_COUNT;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2
        id="referencias"
        className="scroll-mt-28 text-2xl font-semibold tracking-tight mb-4"
      >
        {t('references')}
      </h2>

      <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
        {shown.map((ref, i) => (
          <li key={i}>{ref}</li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 inline-flex items-center gap-1 text-sm text-foreground hover:underline"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              {t('showLessRefs')}
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              {t('showMoreRefs')} (+{items.length - PREVIEW_COUNT})
            </>
          )}
        </button>
      )}
    </section>
  );
};

export default BlogReferences;
