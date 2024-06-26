
'use client'

import GridLayout from "@/components/GridLayout";
import { TourProvider, useTour } from '@reactour/tour'
import { steps, styles } from "@/utils/guide-steps";



export default function Home() {

  const { currentStep } = useTour();
  
  return (
    <TourProvider
      className="rounded-lg !bg-muted"
      styles={styles}
      startAt={1}
      steps={steps}
    >
      <GridLayout/>
    </TourProvider>
  );
}
