const createMessageObj = (type, payload) => {
  return {
    type,
    payload,
  };
};

export const getFiberNodeTagName = (tagNum) => {
  let tagName = '';

  switch (tagNum) {
    case 0:
      tagName = 'Function Component';
      break;
    case 1:
      tagName = 'Class Component';
      break;
    case 2:
      tagName = 'Indeterminate Component';
      break;
    case 3:
      tagName = 'Host Root';
      break;
    case 4:
      tagName = 'Host Portal';
      break;
    case 5:
      tagName = 'Host Component';
      break;
    case 6:
      tagName = 'Host Text';
      break;
    case 7:
      tagName = 'Fragment';
      break;
    case 8:
      tagName = 'Mode';
      break;
    case 9:
      tagName = 'Context Consumer';
      break;
    case 10:
      tagName = 'Context Provider';
      break;
    case 11:
      tagName = 'Forward Ref';
      break;
    case 12:
      tagName = 'Profiler';
      break;
    case 13:
      tagName = 'Suspense Component';
      break;
    case 14:
      tagName = 'Memo Component';
      break;
    case 15:
      tagName = 'Simple Memo Component';
      break;
    case 16:
      tagName = 'Lazy Component';
      break;
    case 17:
      tagName = 'Incomplete Class Component';
      break;
    case 18:
      tagName = 'Dehydrated Fragment';
      break;
    case 19:
      tagName = 'Suspense List Component';
      break;
    case 21:
      tagName = 'Scope Component';
      break;
    case 22:
      tagName = 'Offscreen Component';
      break;
    case 23:
      tagName = 'Legacy Hidden Component';
      break;
    case 24:
      tagName = 'Cache Component';
      break;
    case 25:
      tagName = 'Tracing Marker Component';
      break;
    case 26:
      tagName = 'Host Hoistable';
      break;
    case 27:
      tagName = 'Host Singleton';
      break;
    default:
      console.log('helperFns getFiberNodeTagName error - unrecognized tag number ', tagNum);
  }

  return tagName;
};

export default createMessageObj;
