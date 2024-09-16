import chalk from 'chalk'
export default function print(tag:string, content:string) {
    console.log(`[${chalk.bold.redBright('SIGMA_LOG')}] [${chalk.blue(tag.toUpperCase())}]: ${content}`)
  }