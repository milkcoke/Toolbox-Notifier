import {YamlLoader} from '../../../config/yaml-loader'

describe('Yaml loader', ()=>{
  test('all data', ()=>{
    const data = YamlLoader.getData()
    console.dir(data)
  })
})
