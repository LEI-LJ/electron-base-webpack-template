
/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree (data, id='id', parentId='parentId', children='children') {
  let config = {
    id: id,
    parentId: parentId,
    childrenList: children
  };

  var childrenListMap = {}; // 子数据列表mao
  var nodeIds = {}; // 数据节点
  var tree = [];

  // 生成所有的nodeids的数据节点以及分组childrenListMap节点
  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  // 找出最外层数据并且放到最终树里面
  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }
  // 生成最终树
  for (let t of tree) {
    adaptToChildrenList(t);
  }
  // 将childrenListMap节点与tree匹配
  function adaptToChildrenList (o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}
