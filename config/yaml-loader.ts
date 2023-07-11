import {load} from 'js-yaml'
import {readFileSync} from 'fs'
import {join} from 'path'
import process from 'process'

export class YamlLoader {
  private static readonly _originalData = this._loadOriginalYaml()

  static getData(): any {
    return this._transform(this._originalData)
  }

  private static _loadOriginalYaml(): Record<string, any> {
    let YAML_CONFIG_FILENAME

    switch (process.env.NODE_ENV) {
      case 'local':
        YAML_CONFIG_FILENAME = 'config.local.yaml'
        break
      case 'dev':
        YAML_CONFIG_FILENAME = 'config.dev.yaml'
        break
      case 'prod':
        YAML_CONFIG_FILENAME = 'config.prod.yaml'
        break
      default:
        YAML_CONFIG_FILENAME = 'config.local.yaml'
        break
    }

    return load(
      readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8')
    ) as Record<string, any>
  }

  private static _getOriginalFromKeyWithTraversal(keyStr: string): any {
    const keys = keyStr.split('.')
    let copyObj = YamlLoader._originalData[keys[0]]
    // 처음부터 애초에 존재하지 않는 키를 참조한 경우
    if (copyObj === undefined) {
      throw new Error(`Invalid reference key : ${keyStr}`)
    }
    const restKeys = keys.slice(1)

    for (const key of restKeys) {
      if (copyObj === undefined) {
        throw new Error(`Invalid reference key : ${keyStr}`)
      }
      copyObj = copyObj[key]
    }

    return copyObj
  }

  private static _transform(originalData) : any {
    if (typeof originalData === 'string') {
      // Traverse only when ${word} format.
      if (!originalData.match(/\${([\w.-]+)}/g)) return originalData
      const keyStr = originalData.replace(/\${([\w.-]+)}/g, (originalStr, matchedKey)=> {
        return matchedKey
      })
      return this._getOriginalFromKeyWithTraversal(keyStr)
    } else if (Array.isArray(originalData)) {
      return originalData.map(this._transform)
    } else if (typeof originalData === 'object') {
      const processedObj = {}
      for (const [key, value] of Object.entries(originalData)) {
        processedObj[key] = this._transform(value)
      }
      return processedObj
    }

    return originalData
  }
}
