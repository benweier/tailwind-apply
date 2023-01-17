declare function plugin(options?: Partial<{ styles: string; pattern: string }>): {
  handler: () => void
}

export = plugin
