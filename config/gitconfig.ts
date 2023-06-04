import {readFileSync} from 'fs'
import * as yaml from 'js-yaml'
import {join} from 'path'

const YAML_CONFIG_FILENAME = 'gitconfig.yaml'

export default (): Record<string, any> => {
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8')
  ) as Record<string, any>
}
