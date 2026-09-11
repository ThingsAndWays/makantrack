import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function PortionGuide() {
  return (
    <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40">
      <AlertTitle className="text-amber-900 dark:text-amber-300">✊ Estimate portions with your fist</AlertTitle>
      <AlertDescription className="text-amber-800 dark:text-amber-400">
        A closed fist is roughly the size of <strong>1 cup (~250ml)</strong> — about one serving of rice or
        noodles. Each dish shows how many fists its standard hawker serving is worth; use the{' '}
        <strong>−</strong> / <strong>+</strong> stepper to match what's actually on your plate and the
        calories &amp; macros scale with it.
      </AlertDescription>
    </Alert>
  )
}
