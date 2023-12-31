import moment from 'moment'
import slug from 'slug'

/**
 *
 * Get values or attributes for pagination
 *
 * @param {object} req
 */
export const paginate = (req) => {
  const size = req.size || 10
  const page = req.page || 1
  const skip = (page - 1) * size

  return { size, page, skip }
}

/**
 *
 * Get pagination link and send a response
 *
 * @param {*} data
 * @param {number} size
 * @param {number} page
 * @param {number} total
 * @returns
 */
export const paginateLink = (data, size, page, total) => {
  return {
    data,
    per_page: size,
    current_page: page,
    last_page: Math.ceil((total || 1) / size),
    from: Math.ceil(page * size - (size - 1)),
    to: Math.ceil(page * size),
    total
  }
}

/**
 *
 * @param {*} file
 * @returns
 */
export const getFileUploadAttributes = (file) => {
  if (!file) {
    return
  }

  return {
    size: file.size,
    extension: file.originalname.split('.').pop(),
    mimetype: file.mimetype
  }
}

/**
 *
 * @param {string} string
 * @param {string} [separator="-"]
 * @returns {string}
 */
export const strSlug = (string, separator = '-') => {
  return slug(string, separator)
}

/**
 * Remove the selected properties of object and return them
 *
 * @param {object} obj
 * @param {array} props
 * @returns {array}
 */
export const deleteSelectedProperties = (obj, props = []) => {
  let deletedProps = []

  props.forEach((prop) => {
    deletedProps.push(obj[prop])
    delete obj[prop]
  })

  return deletedProps
}

/**
 * Generate random string
 *
 * @param {number} length
 * @returns {string}
 */
export const strRandom = (length) => {
  let result = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charsLength = chars.length

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charsLength))
  }

  return result
}

/**
 *
 * @param {number} number
 * @param {number} length
 * @returns
 */
export const addLeadingZero = (number, length) => {
  let str = String(number)
  if (str.length > length) return

  str = str.padStart(length, '0')

  return str
}

/**
 * convert date to Indonesian format
 *
 * @param {string|ISODate} date
 * @returns {string}
 */
export const convertDateToIndonesianFormat = (date) => {
  if (!date) {
    return
  }

  const months = [
    '',
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]
  const year = moment(date).format('YYYY')
  const month = months[Number(moment(date).format('M'))]
  const newDate = moment(date).format('DD')

  return `${newDate} ${month} ${year}`
}
