import { createContext, useContext } from 'react';
import type { AlignmentType } from '../../tokens';
import { Alignment } from '../../tokens';

interface TimelineContextValue {
  align: AlignmentType;
}

const TimelineContext = createContext<TimelineContextValue>({
  align: Alignment.LEFT,
});

export const TimelineProvider = TimelineContext.Provider;

export const useTimelineContext = () => {
  return useContext(TimelineContext);
};
