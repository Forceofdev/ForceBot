globalThis.GetSigmaPackage = async (packageName: string, returnDefault: boolean) => {
   const pkg = await import(`./exportedPackages/${packageName}.js`)
   if (returnDefault == true) return pkg.default
   return pkg
}
