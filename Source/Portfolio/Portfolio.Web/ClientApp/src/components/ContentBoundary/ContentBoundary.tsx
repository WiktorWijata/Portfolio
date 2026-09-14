import type { ReactNode } from 'react';
import { EmptyState, Button, ButtonVariant, IconName, Container, CircularProgress, Text, TextVariant, TextSize } from '../../design-system/components';
import { useContent } from '../../api';
import { useTranslation } from 'react-i18next';

interface ContentBoundaryProps {
  children: ReactNode;
}

export function ContentBoundary({ children }: ContentBoundaryProps) {
  const { t } = useTranslation();
  const { content, isLoading, error, refetch } = useContent();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <CircularProgress size="lg" />
          <Text variant={TextVariant.MUTED} size={TextSize.SM}>
            {t('common.loading')}
          </Text>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <Container>
          <EmptyState
            icon={IconName.ALERT_TRIANGLE}
            title={t('errors.unavailable.title')}
            description={t('errors.unavailable.description')}
            action={
              <Button variant={ButtonVariant.OUTLINED} onClick={() => refetch()}>
                {t('errors.retry')}
              </Button>
            }
          />
        </Container>
      </div>
    );
  }

  return <>{children}</>;
}
