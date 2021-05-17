import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'

import { Box, Button, Card, Container, HeadingMain, ListItem, Spinner } from '../atoms'
import { paths } from '../navigation'
import { Users } from '../api/collections'
import { Meteor } from 'meteor/meteor'

const ListRow = ({ item }) => (
  <ListItem to={paths.school.editStaff(item._id)}>
    <Box>{item.name()}</Box>
  </ListItem>
)

export const StaffList = () => {
  const query = useTracker(() => {
    return {
      loading: !Meteor.subscribe('school.staff').ready(),
      data: Users.find({ owner_id: Meteor.userId, roles: 'staff' }).fetch(),
    }
  }, [])

  return (
    <Container>
      <HeadingMain>Inštruktori</HeadingMain>
      <Button to={paths.school.addStaff()} outline alignSelf="flex-start">
        Pridať noveho
      </Button>

      <Card mt={4}>
        {query.loading && <Spinner />}
        {!query.loading && (
          <Box>
            {query.data.map((item) => (
              <ListRow key={item._id} item={item} />
            ))}
          </Box>
        )}
      </Card>
    </Container>
  )
}
