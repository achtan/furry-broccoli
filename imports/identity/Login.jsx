import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Form, Formik, Input } from '../atoms/Form'
import { Box, Button, Card, Heading, Icon, Link, Logo, Text } from '../atoms'
import * as Yup from 'yup'
import { paths } from '../navigation'

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

export const Login = () => {
  const onSubmit = ({ email, password }, { setErrors }) => {
    Meteor.loginWithPassword(email, password, (error) => {
      if (!error) {
        return null
      }
      if (error.error === 403) {
        return setErrors({ email: 'Nesprávny email alebo heslo.' })
      }

      setErrors({ email: 'Nastala chyba :(' })
    })
  }

  return (
    <Box widht="100%" flexGrow={1}>
      <Box
        pb="6rem"
        pt={['4rem', '6rem', '10rem']}
        sx={{ background: 'linear-gradient(87deg,#5e72e4 0,#825ee4 100%)!important' }}
      >
        <Box alignItems="center" mb="2rem">
          <Logo white />
          <Box mt={3}>
            <Text color="white" fontSize={4}>Vytajte!</Text>
          </Box>
        </Box>
      </Box>
      <Box alignItems="center">
        <Card alignItems="center" mt="-5rem">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <Heading>Prihlásenie</Heading>
              <Text mb={4}>Nemáte ešte účet? <Link href={paths.fe.home()}>Registrujte sa teraz.</Link></Text>
              <Input name="email" placeholder="Email" leftIcon="user" />
              <Input
                type="password"
                name="password"
                placeholder="Heslo"
                autoComplete="current-password"
                leftIcon="unlock"
              />
              <Button type="submit">Prihlásiť</Button>
            </Form>
          </Formik>
        </Card>
      </Box>
    </Box>
  )
}
