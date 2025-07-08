import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VisitData {
  page_url: string;
  user_agent: string;
  referrer: string;
  language: string;
  screen_resolution: string;
  device_type: string;
  browser: string;
  session_id: string;
}

export const useVisitTracker = () => {
  const sessionId = useRef<string>();
  const visitStartTime = useRef<number>();
  const currentVisitId = useRef<string>();

  useEffect(() => {
    // Generate session ID if not exists
    if (!sessionId.current) {
      sessionId.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    const trackVisit = async () => {
      try {
        visitStartTime.current = Date.now();
        
        // Get device info
        const userAgent = navigator.userAgent;
        const language = navigator.language;
        const screenResolution = `${screen.width}x${screen.height}`;
        
        // Detect device type
        const deviceType = /Mobi|Android/i.test(userAgent) ? 'mobile' : 
                          /Tablet|iPad/i.test(userAgent) ? 'tablet' : 'desktop';
        
        // Detect browser
        const browser = userAgent.includes('Chrome') ? 'Chrome' :
                       userAgent.includes('Firefox') ? 'Firefox' :
                       userAgent.includes('Safari') ? 'Safari' :
                       userAgent.includes('Edge') ? 'Edge' : 'Other';

        const visitData: VisitData = {
          page_url: window.location.href,
          user_agent: userAgent,
          referrer: document.referrer,
          language,
          screen_resolution: screenResolution,
          device_type: deviceType,
          browser,
          session_id: sessionId.current!
        };

        // Insert visit
        const { data, error } = await supabase
          .from('visits' as any)
          .insert([visitData])
          .select('id')
          .single();

        if (error) {
          console.error('Error tracking visit:', error);
        } else if (data) {
          currentVisitId.current = (data as any).id;
        }
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    const updateVisitDuration = async () => {
      if (!currentVisitId.current || !visitStartTime.current) return;

      try {
        const duration = Math.round((Date.now() - visitStartTime.current) / 1000);
        
        await supabase
          .from('visits' as any)
          .update({ duration })
          .eq('id', currentVisitId.current);
      } catch (error) {
        console.error('Error updating visit duration:', error);
      }
    };

    // Track initial visit
    trackVisit();

    // Update duration on page unload
    const handleBeforeUnload = () => {
      updateVisitDuration();
    };

    // Update duration periodically
    const durationInterval = setInterval(updateVisitDuration, 30000); // Every 30 seconds

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(durationInterval);
      updateVisitDuration();
    };
  }, []);

  return { sessionId: sessionId.current };
};