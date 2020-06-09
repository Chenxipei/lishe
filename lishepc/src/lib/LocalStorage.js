// import utils from './utils'

export const setStore = (params) => {
    const {
        name,
        content,
        type
        // datetime
    } = params
    const obj = {
        dataType: typeof (content),
        content: content,
        type: type
        // datetime: new Date().getTime()
    }
    if (type) window.sessionStorage.setItem(name, JSON.stringify(obj))
    else window.localStorage.setItem(name, JSON.stringify(obj))
}

/**
 * 获取localStorage
 */
export const getStore = (params) => {
    const {
        name
    } = params
    let obj = {}
    let content
    obj = window.localStorage.getItem(name)
    if (utils.validatenull(obj)) obj = window.sessionStorage.getItem(name)
    if (utils.validatenull(obj)) return
    obj = JSON.parse(obj)
    if (obj.dataType === 'string') {
        content = obj.content
    } else if (obj.dataType === 'number') {
        content = Number(obj.content)
    } else if (obj.dataType === 'boolean') {
        content = !!obj.content
    } else if (obj.dataType === 'object') {
        content = obj.content
    }
    return content
}
/**
 * 删除localStorage
 */
export const removeStore = params => {
    let {
        name
    } = params
    window.localStorage.removeItem(name)
    window.sessionStorage.removeItem(name)
}
/**
 * 判断是否为空
 */
export const validatenull = (val) => {
    if (val instanceof Array) {
        if (val.length === 0) return true
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true
    } else {
        if (val === 'null' || val === null || val === 'undefined' || val === undefined || val === '') return true
        return false
    }
    return false
  }