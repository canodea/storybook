import { Icon } from "../../foundations";
import styles from "./StepBars.module.css";

type StepState = "completed" | "current" | "upcoming";

export type StepBarsProps = {
  className?: string;
  /** Aktif adım (1-4). Öncekiler otomatik tamamlandı, sonrakiler sırada görünür. */
  current?: 1 | 2 | 3 | 4;
  /** Dört adımın başlıkları; verilmeyen adımlar varsayılan başlığı kullanır. */
  labels?: [string, string, string, string];
};

const DEFAULT_LABELS: [string, string, string, string] = [
  "Label 1",
  "Label 2",
  "Label 3",
  "Label 4",
];

export default function StepBars({
  className,
  current = 1,
  labels,
}: StepBarsProps) {
  const currentStep = Math.min(Math.max(1, Math.trunc(current)), 4);

  const resolvedSteps = DEFAULT_LABELS.map((defaultLabel, index) => {
    const position = index + 1;
    const state: StepState =
      position < currentStep
        ? "completed"
        : position === currentStep
          ? "current"
          : "upcoming";
    return {
      label: labels?.[index] ?? defaultLabel,
      state,
    };
  });

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")}>
      <ol className={styles.list} aria-label="İlerleme adımları">
        {resolvedSteps.map(({ label, state }, index) => (
          <li
            key={index}
            className={styles.step}
            aria-current={state === "current" ? "step" : undefined}
          >
            {index > 0 && (
              <span
                className={`${styles.connector} ${state === "upcoming" ? "" : styles.connectorDone}`}
                aria-hidden="true"
              />
            )}
            <span
              className={`${styles.tag} ${styles[state]}`}
              aria-hidden="true"
            >
              {state === "completed" && (
                <Icon set="System" name="Check" size={14} />
              )}
            </span>
            <span className={`${styles.label} ${styles[`${state}Label`]}`}>
              {label}
              {state === "completed" && (
                <span className={styles.srOnly}> (tamamlandı)</span>
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
