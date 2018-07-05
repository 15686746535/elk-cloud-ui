function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function sexFilter(sex) {
  const typeMap = {
    '0': '男',
    '1': '女'
  }
  return typeMap[sex]
}
export function isCoachFilter(coach) {
  const typeMap = {
    '16': '场训教练',
    '32': '路训教练',
    '48': '场训教练，路训教练',
    '0': '不是教练'
  }
  return typeMap[coach]
}
export function subjectFilter(subject) {
  const typeMap = {
    '0': '未录入122',
    '1': '科目一',
    '2': '科目二',
    '3': '科目三',
    '4': '科目四',
    '5': '毕业',
    '-1': '退学'
  }
  return typeMap[subject]
}
// export function sendFilter(status) {
//   const typeMap = {
//     '0': '暂未发送',
//     '100': '发送成功',
//     '101': '验证失败(101)',
//     '102': '手机号码格式不正确(102)',
//     '103': '会员级别不够(103)',
//     '104': '内容未审核(104)',
//     '105': '内容过多(105)',
//     '106': '账户余额不足(106)',
//     '107': 'Ip受限(107)',
//     '108': '手机号码发送太频繁，请换号或隔天再发(108)',
//     '109': '帐号被锁定(109)',
//     '110': '发送通道不正确(110)',
//     '111': '当前时间段禁止短信发送(111)',
//     '120': '短信发送系统升级(120)'
//   }
//   return typeMap[status]
// }
export function subTime(time, cFormat) {
  if (arguments[0] === undefined || arguments[0] == null) {
    return null
  }
  if (cFormat === 'dateTime') {
    try {
      return parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}')
    } catch (e) {
      return time
    }
  } else if (cFormat === 'time') {
    try {
      return time.substr(10)
    } catch (e) {
      return parseTime(time, '{h}:{i}:{s}')
    }
  } else if (cFormat === undefined || 'data') {
    try {
      return time.substr(0, 10)
    } catch (e) {
      return parseTime(time, '{y}-{m}-{d}')
    }
  }
}
export function parseJson(value, column) {
  value = JSON.parse(value)
  if (column === 'cost') return value.cost
  if (column === 'arrearage') return value.arrearage
}
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if (arguments[0] === undefined || arguments[0] == null) {
    return null
  }
  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  // time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/* 转化为人名币  大写 */
export function smalltoBIG(n) {
  var fraction = ['角', '分']
  var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
  var head = n < 0 ? '欠' : ''
  n = Math.abs(n)

  var s = ''

  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)

  for (var i = 0; i < unit[0].length && n > 0; i++) {
    var p = ''
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(n / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
}
