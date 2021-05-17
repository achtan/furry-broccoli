import React from 'react'
import { Meteor } from 'meteor/meteor'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'

import { Form, Formik, Input, RevealContent } from '../atoms/Form'
import { useNavigation } from '../navigation'
import { Button, Card, Container, HeadingMain, Spinner } from '../atoms'
import { useTracker } from 'meteor/react-meteor-data'
import { Users } from '../api/collections'

const validationSchema = Yup.object().shape({
  isNew: Yup.boolean(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().when('isNew', {
    is: true,
    then: Yup.string().min(6).required(),
    otherwise: Yup.string(),
  }),
  changePassword: Yup.boolean(),
  newPassword: Yup.string().when('changePassword', {
    is: true,
    then: Yup.string().min(6).required(),
    otherwise: Yup.string(),
  }),
})

export const StaffEdit = () => {
  const { history, paths } = useNavigation()
  const { id: staffId } = useParams()

  const query = useTracker(() => {
    return {
      loading: !Meteor.subscribe('school.staff', { staffId }).ready(),
      data: Users.findOne(staffId),
    }
  }, [staffId])

  if (query.loading) {
    return <Spinner />
  }

  const handleSubmit = (values) => {
    Meteor.call('school.saveStaff', { _id: staffId, ...values })
    history.push(paths.school.staffList())
  }

  const initialValues = {
    isNew: !staffId,
    firstName: query?.data?.profile?.firstName,
    lastName: query?.data?.profile?.lastName,
    email: query?.data?.username,
    password: '',
    changePassword: false,
    newPassword: '',
  }
  return (
    <Container>
      <HeadingMain>Inštruktor</HeadingMain>
      <Card>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Input label="Meno" name="firstName" />
            <Input label="Priezvisko" name="lastName" />
            <Input label="Email" name="email" disabled={!!staffId} />
            {!staffId && <Input type="password" label="Heslo" name="password" />}
            {staffId && (
              <RevealContent label="Zmeniť heslo" name="changePassword">
                <Input type="password" label="Nové heslo" name="newPassword" />
              </RevealContent>
            )}
            <Button type="submit">Pridať</Button>
          </Form>
        </Formik>
      </Card>
    </Container>
  )
}
