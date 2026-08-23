type SwitchProps = {
  modeProgressif: boolean
  onChange: (valeur: boolean) => void
}

/** Paliers ou dégradé continu. Le double libellé de 2019 est conservé. */
export function ModeSwitch({ modeProgressif, onChange }: SwitchProps) {
  return (
    <label className="mode-switch">
      <span data-active={!modeProgressif}>Step</span>
      <button
        type="button"
        role="switch"
        aria-checked={modeProgressif}
        aria-label="Progressive colour scale"
        className="switch-track"
        onClick={() => onChange(!modeProgressif)}
      >
        <span className="switch-thumb" />
      </button>
      <span data-active={modeProgressif}>Progressive</span>
    </label>
  )
}

type SliderProps = {
  valeur: number
  onChange: (valeur: number) => void
  readout: string
}

export function RepartitionSlider({ valeur, onChange, readout }: SliderProps) {
  return (
    <div className="slider-zone">
      <span className="slider-label" id="repartition-label">
        Wealth repartition
      </span>
      <span className="slider-readout" aria-live="polite">
        {readout}
      </span>
      <div className="slider-track">
        {/* La bulle de valeur au-dessus du pouce, comme en 2019. Le décalage
            compense la largeur du pouce, sinon elle dérive aux extrémités. */}
        <span
          className="slider-bubble"
          aria-hidden="true"
          style={{ left: `calc(${valeur}% + ${(0.5 - valeur / 100) * 18}px)` }}
        >
          {valeur}
        </span>
        <input
          type="range"
          className="slider-input"
          min={0}
          max={100}
          step={1}
          value={valeur}
          aria-labelledby="repartition-label"
          aria-valuetext={`${valeur} percent shared`}
          style={{ ["--fill" as string]: `${valeur}%` }}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </div>
      <div className="slider-marks">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  )
}
