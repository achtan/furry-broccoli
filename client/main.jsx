import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/initApp'
import { App } from '/imports/layout/App';

Meteor.startup(() => {
  render(<App/>, document.getElementById('react-target'));
});
