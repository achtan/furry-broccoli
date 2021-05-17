import { useHistory, useParams } from 'react-router-dom'
import { createContainer } from '../helpers/unstated'

import { paths } from './paths'

export const NavigationContainer = createContainer('App', () => {
  const history = useHistory()

  return {
    history,
    paths,
  }
})

export const useNavigation = () => NavigationContainer.useContainer()
