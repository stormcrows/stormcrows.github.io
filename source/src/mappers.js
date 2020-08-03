export const mapKey = key => ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][key]
export const mapProb = v => `${Math.floor(v > 1 ? v : v * 100.0)}%`
export const mapMode = m => m === 1 ? 'Major' : 'Minor'
export const mapExplicit = e => e === 0 ? 'No' : 'Yes'
export const mapDuration = d => `${Number(d / 1000 / 60).toPrecision(2)}m`
export const stringifyArrayText = t => t && t.replace(/['"[\]]+/g, '')