/* eslint-disable */

const exampleTree = {
  root:  {
      children: [ {
          children: [],
          tagObj: {
              tag: 0,
              tagName: 'Function Component'
          },
          componentName: 'Board',
          componentProps: {},
          componentState: {
              baseQueue: null,
              baseState: ['-', '-', 'X', '-', '-', '-', '-', '-', '-'],
              memoizedState: ['-', '-', 'X', '-', '-', '-', '-', '-', '-'],
              next: null,
              queue: {
                  dispatch: null,
                  lastRenderedReducer: 'basicStateReducer(state, action)',
                  lastRenderedState: ['-', '-', 'X', '-', '-', '-', '-', '-', '-'],
                  pending: null
              }
          },
          renderDurationMS: 1.9000000357627869,
          actualStartTime: 3505.699999988079,
          selfBaseDuration: 0.5
      }],
      tagObj: {
          tag: 3,
          tagName: 'Host Root'
      },
      componentName: '',
      componentProps: null,
      componentState: {
          baseQueue: null,
          baseState: null,
          memoizedState: {
              current: true
          },
          next: null,
          queue: null
      },
      renderDurationMS: 2.100000023841858,
      actualStartTime: 3505.4000000059605,
      selfBaseDuration: 1.300000011920929
  }
};

module.exports = exampleTree;