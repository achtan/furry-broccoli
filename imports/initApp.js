import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isoWeek from 'dayjs/plugin/isoWeek'
import 'dayjs/locale/sk'
import { setLocale } from 'yup'

import './initEmailTemplates'

dayjs.locale('sk')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isoWeek)

dayjs.tz.setDefault('Europe/Vienna')

// locales: https://github.com/jquense/yup/blob/master/src/locale.ts
setLocale({
  mixed: {
    default: 'Nesprávny údaj.',
    required: 'Povinný údaj.',
  },
  string: {
    min: 'Minimum znakov je ${min}.',
    max: 'Maximum znakov je ${max}.',
  },
})
