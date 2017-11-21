import { is } from 'immutable';

const keys = Object.keys;
export default function shallowEqualImmutable(context, nextProps, nextState) {
    const currentState = context.state;
    const currentProps = context.props;
    const nextStateKeys = keys(nextState || {});
    const nextPropsKeys = keys(nextProps);

  // 先从数据的长度判断
    if (nextStateKeys.length !== keys(currentState || {}).length || nextPropsKeys.length !== keys(currentProps).length) {
        return true;
    }

  //  再按key 逐个比较数据是否相等
    const isUpdate = nextStateKeys.some(item => (
    currentState[item] !== nextState[item] && !is(currentState[item], nextState[item])
  ));

    if (isUpdate) {
        return true;
    }

    return nextPropsKeys.some(item => (currentProps[item] && !is(currentProps[item], nextProps[item])));
}
