// Note the name of this file has X.test.js. Jest looks for any files with this pattern.

/*  First we import our Enzyme configuration (1), this is defined in a different
 *    file and is require to use Enzyme for components. In addition to the standard
 *    imports you've seen before, we are using Enzyme.shallow (2), this "renders"
 *    your component but only for the first layer in the DOM (ie. <Itinerary/> will
 *    just render <Itinerary/> even though it may have more components under it.).
 *    Shallow rendering prevents problems with lower components from showing up in
 *    the tests of parent components.
*/

import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount } from 'enzyme'              // (2)
import Options from '../src/components/Application/Options'

/* Both of these tests are functionally identical although the standard way
 *  of writing tests uses lambda or anonymous functions. These are useful
 *  for defining functions that will only be in your code once but may be
 *  called multiple times by whatever they are passed to.
*/

/* A test response for our client to use;
 * this object represents the props that would be passed to the Options
 * component on construction.
 */
const startProps = {
  'config': { 'units': ['miles', 'kilometers', 'nautical miles'] },
  'options': { 'unit': 'miles' },
  'userDefined': ['unitName','unitRadius']
};

/* Test example using a pre-defined function */
function testButtons() {
  const options = mount((
      <Options config={startProps.config} options={startProps.options}/>
  ));

  let actual = [];
  options.find('Button').map((element) => actual.push(element.prop('value')));

  expect(actual).toEqual(startProps.config.units);
}

test('Check to see if table gets made correctly (Function)', testButtons);

function testInput() {
    const options = mount((
        <Options config={startProps.config} options={startProps.userDefined}/>
    ));

    let actual = [];
    options.find('Input').map((element) => actual.push(element.prop('name')));

    expect(actual).toEqual(startProps.userDefined);
}

test('Check to see if table gets made correctly (Function)', testInput);