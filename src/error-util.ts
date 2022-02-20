export function replaceInErrorMessage({
  operation,
  from,
  to,
  flags = [RegExpFlags.global, RegExpFlags.ignoreCase],
}: {
  operation: Function // eslint-disable-line @typescript-eslint/ban-types
  from: string
  to: string
  flags?: RegExpFlags[]
}): any {
  try {
    return operation()
  } catch (err: unknown) {
    if (err instanceof Error) {
      err.message = err.message.replace(new RegExp(from, flags.join('')), to)
    }
    throw err
  }
}

export enum RegExpFlags {
  hasIndices = 'd',
  global = 'g',
  ignoreCase = 'i',
  multiline = 'm',
  dotAll = 's',
  unicode = 'u',
  sticky = 'y',
}
