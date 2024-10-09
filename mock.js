// import Mock from 'mockjs';

// // 模拟获取物品形状
// Mock.mock('/api/item_shapes', 'get', {
//   code: 1,
//   message: '请求成功',
//   data: [
//     {id: 1, name: '圆形' },
//     {id: 2, name: '方形' },
//     {id: 3, name: '三角形' },
//     {id: 4, name: '矩形' },
//     {id: 5, name: '椭圆形' }
//   ]
// });


// // 模拟创建物品特征
// Mock.mock('/api/features', 'post', (options) => {
//   const { feature } = JSON.parse(options.body);
//   return {
//     code: 1,
//     message: '物品特征创建成功',
//     data: {
//       id: Mock.mock('@increment'), // 使用自增ID
//       feature: feature,
//     }
//   };
// });

// // 模拟更新物品特征
// Mock.mock(/\/api\/features\/\d+/, 'put', (options) => {
//   const { feature } = JSON.parse(options.body);
//   return {
//     code: 1,
//     message: '物品特征更新成功',
//     data: {
//       id: parseInt(options.url.split('/').pop()), // 从URL中获取ID
//       feature: feature,
//     }
//   };
// });

// // 模拟删除物品特征
// Mock.mock(/\/api\/features\/\d+/, 'delete', {
//   code: 1,
//   message: '物品特征删除成功'
// });

// // 模拟创建物品
// Mock.mock('/api/items', 'post', (options) => {
//   const item = JSON.parse(options.body);
//   return {
//     code: 1,
//     message: '物品创建成功',
//     data: {
//       id: Mock.mock('@increment'), // 使用自增ID
//       ...item
//     }
//   };
// });

// // 模拟获取物品列表
// Mock.mock('/api/items', 'get', {
//   code: 1,
//   message: '获取物品列表成功',
//   data: Array.from({ length: 10 }, (_, index) => ({
//     id: index + 1,
//     length: Mock.mock('@integer(1, 100)'),
//     width: Mock.mock('@integer(1, 100)'),
//     height: Mock.mock('@integer(1, 100)'),
//     position_x: Mock.mock('@integer(0, 50)'),
//     position_y: Mock.mock('@integer(0, 50)'),
//     position_z: Mock.mock('@integer(0, 50)'),
//     quantity: Mock.mock('@integer(1, 100)'),
//     shape_id: Mock.mock('@integer(1, 5)'),
//     threshold: Mock.mock('@integer(1, 100)'),
//     container_id: Mock.mock('@integer(1, 20)'),
//     feature: [
//       { id: Mock.mock('@increment'), feature: '特征' + (index + 1) },
//       { id: Mock.mock('@increment'), feature: '特征' + (index + 2) }
//     ]
//   }))
// });

// // 模拟获取单个物品的详细信息
// Mock.mock(/\/api\/items\/\d+/, 'get', (options) => {
//   const id = parseInt(options.url.split('/').pop());
//   return {
//     code: 1,
//     message: '获取物品详情成功',
//     data: {
//       id: id,
//       length: Mock.mock('@integer(1, 100)'),
//       width: Mock.mock('@integer(1, 100)'),
//       height: Mock.mock('@integer(1, 100)'),
//       position_x: Mock.mock('@integer(0, 50)'),
//       position_y: Mock.mock('@integer(0, 50)'),
//       position_z: Mock.mock('@integer(0, 50)'),
//       quantity: Mock.mock('@integer(1, 100)'),
//       shape_id: Mock.mock('@integer(1, 5)'),
//       threshold: Mock.mock('@integer(1, 100)'),
//       container_id: Mock.mock('@integer(1, 20)'),
//       feature: [
//         { id: Mock.mock('@increment'), feature: '特征A' },
//         { id: Mock.mock('@increment'), feature: '特征B' },
//       ]
//     }
//   };
// });
