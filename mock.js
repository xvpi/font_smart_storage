import Mock from 'mockjs';

// 6.3模拟获取物品所有形状
Mock.mock('/api/item_shapes', 'get', {
  code: 1,
  message: '请求成功',
  data: [
    {id: 1, name: '圆形' },
    {id: 2, name: '方形' },
    {id: 3, name: '三角形' },
    {id: 4, name: '矩形' },
    {id: 5, name: '椭圆形' }
  ]
});


// 7.1模拟创建物品特征
Mock.mock('/api/features', 'post', (options) => {
  console.log('接收到的请求数据:', options); // 查看接收到的数据
  const { feature } = JSON.parse(options.body);
  
  // 检查 feature 是否成功解析，防止为空
  if (!feature) {
    return {
      code: 0,
      message: '特征不能为空',
    };
  }

  // 返回的数据
  const responseData = {
    code: 1,
    message: '物品特征创建成功',
    data: {
      id: Mock.mock('@increment'),  // 使用自增 ID
      feature: feature
    }
  };

  console.log('返回的模拟数据:', responseData); // 打印模拟返回的数据
  return responseData;
});



// 模拟获取特征
Mock.mock(/\/api\/features\/\d+/, 'get', (options) => {
  const id = parseInt(options.url.split('/').pop());
  return {
    code: 1,
    message: '特征信息获取成功',
    data: {
      id: id,
      feature: '随机特征'
    }
  };
});

// 模拟更新物品特征
Mock.mock(/\/api\/features\/\d+/, 'put', (options) => {
  const { feature } = JSON.parse(options.body);
  return {
    code: 1,
    message: '物品特征更新成功',
    data: {
      id: parseInt(options.url.split('/').pop()), // 从URL中获取ID
      feature: feature,
    }
  };
});

// 模拟删除物品特征
Mock.mock(/\/api\/features\/\d+/, 'delete', {
  code: 1,
  message: '物品特征删除成功'
});

// 5.1模拟创建物品
Mock.mock('/api/items', 'post', (options) => {
  const item = JSON.parse(options.body);
  return {
    code: 1,
    message: '物品创建成功',
    data: {
      id: Mock.mock('@increment'), // 使用自增ID
      ...item
    }
  };
});

// 模拟获取物品列表
Mock.mock('/api/items', 'get', {
  code: 1,
  message: '获取物品列表成功',
  data: Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    length: Mock.mock('@integer(1, 100)'),
    width: Mock.mock('@integer(1, 100)'),
    height: Mock.mock('@integer(1, 100)'),
    position_x: Mock.mock('@integer(0, 50)'),
    position_y: Mock.mock('@integer(0, 50)'),
    position_z: Mock.mock('@integer(0, 50)'),
    quantity: Mock.mock('@integer(1, 100)'),
    shape_id: Mock.mock('@integer(1, 5)'),
    threshold: Mock.mock('@integer(1, 100)'),
    container_id: Mock.mock('@integer(1, 20)'),
    feature: [
      { id: Mock.mock('@increment'), feature: '特征' + (index + 1) },
      { id: Mock.mock('@increment'), feature: '特征' + (index + 2) }
    ]
  }))
});

// 模拟获取单个物品的详细信息
// 模拟获取单个物品的详细信息
Mock.mock(/\/api\/items\/\d+/, 'get', (options) => {
  const id = parseInt(options.url.split('/').pop());
  return {
    code: 1,
    message: '物品获取成功',
    data: {
      id: id,
      length: Mock.mock('@float(10, 100, 1, 2)'),
      width: Mock.mock('@float(10, 100, 1, 2)'),
      height: Mock.mock('@float(10, 100, 1, 2)'),
      position_x: Mock.mock('@float(0, 50, 1, 2)'),
      position_y: Mock.mock('@float(0, 50, 1, 2)'),
      position_z: Mock.mock('@float(0, 50, 1, 2)'),
      quantity: Mock.mock('@integer(1, 100)'),
      shape: {
        id: Mock.mock('@integer(1, 5)'),
        shape: Mock.mock({
          '1': '圆形',
          '2': '方形',
          '3': '三角形',
          '4': '矩形',
          '5': '椭圆形'
        })
      },
      threshold: Mock.mock('@integer(1, 100)'),
      room: {
        id: Mock.mock('@integer(1, 20)'),
        name: '房间' + Mock.mock('@integer(1, 20)'),
        length: 6000.0,
        width: 6000.0,
        height: 4000.0,
        positionX: 0.0,
        positionY: 0.0,
        positionZ: 0.0
      },
      container: {
        id: Mock.mock('@integer(1, 10)'),
        position_x: Mock.mock('@float(0, 50, 1, 2)'),
        position_y: Mock.mock('@float(0, 50, 1, 2)'),
        position_z: Mock.mock('@float(0, 50, 1, 2)'),
        length: Mock.mock('@float(10, 100, 1, 2)'),
        width: Mock.mock('@float(10, 100, 1, 2)'),
        height: Mock.mock('@float(10, 100, 1, 2)')
      },
      feature: [
        { id: 1, feature: '特征A' },
        { id: 2, feature: '特征B' }
		// 注意：这里特征的feature原api文档好像没写
      ]
    }
  };
});

// 模拟获取单个柜子的详细信息
Mock.mock(/\/api\/containers\/\d+/, 'get', (options) => {
  const id = parseInt(options.url.split('/').pop());
  return {
    code: 1,
    message: '柜子信息获取成功',
    data: {
      id: id,
      position_x: Mock.mock('@float(0, 50, 1, 2)'),
      position_y: Mock.mock('@float(0, 50, 1, 2)'),
      position_z: Mock.mock('@float(0, 50, 1, 2)'),
      length: Mock.mock('@float(100, 500, 1, 2)'),
      width: Mock.mock('@float(100, 500, 1, 2)'),
      height: Mock.mock('@float(100, 500, 1, 2)'),
      room: {
        id: Mock.mock('@integer(1, 10)'),
        name: '房间' + Mock.mock('@integer(1, 10)'),
        length: 6000.0,
        width: 6000.0,
        height: 4000.0,
        positionX: 0.0,
        positionY: 0.0,
        positionZ: 0.0
      },
      parent_id: Mock.mock('@integer(1, 5)'),
      container_type: {
        id: Mock.mock('@integer(1, 5)'),
        type: Mock.mock({
          '1': '储物柜',
          '2': '冷藏柜',
          '3': '展示柜',
          '4': '药品柜',
          '5': '档案柜'
        })
      },
      container_feature: [
        { id: 1, feature: '抗震功能' },
        { id: 2, feature: '防水功能' }
      ],
      item: [
		  {
			  id: Mock.mock('@integer(1, 10)'),
			  length: Mock.mock('@float(10, 100, 1, 2)'),
			  width: Mock.mock('@float(10, 100, 1, 2)'),
			  height: Mock.mock('@float(10, 100, 1, 2)'),
			  position_x: Mock.mock('@float(0, 50, 1, 2)'),
			  position_y: Mock.mock('@float(0, 50, 1, 2)'),
			  position_z: Mock.mock('@float(0, 50, 1, 2)'),
			  quantity: Mock.mock('@integer(1, 100)'),
		  },{
		  id: Mock.mock('@integer(1, 10)'),
		  length: Mock.mock('@float(10, 100, 1, 2)'),
		  width: Mock.mock('@float(10, 100, 1, 2)'),
		  height: Mock.mock('@float(10, 100, 1, 2)'),
		  position_x: Mock.mock('@float(0, 50, 1, 2)'),
		  position_y: Mock.mock('@float(0, 50, 1, 2)'),
		  position_z: Mock.mock('@float(0, 50, 1, 2)'),
		  quantity: Mock.mock('@integer(1, 100)')}
	  ]
    }
  };
});

// 修改容器信息
Mock.mock('/api/containers', 'put', (options) => {
  return {
    "code": 1,
    "data": {
      "container_id": 1,
      "position_x": 150.0,
      "position_y": 250.0,
      "position_z": 350.0,
      "length": 1100.0,
      "width": 550.0,
      "height": 550.0,
      "room": {
        "id": 1,
        "name": "主仓库",
        "length": 6000.0,
        "width": 6000.0,
        "height": 4000.0,
        "positionX": 0.0,
        "positionY": 0.0,
        "positionZ": 0.0
      },
      "parent_id": 0,
      "container_type": {
        "id": 1,
        "type": "储物柜"
      },
      "container_feature": [
        {
          "id": 1,
          "feature": "防水"
        },
        {
          "id": 2,
          "feature": "耐高温"
        }
      ]
    },
    "message": "柜子信息更新成功"
  };
});

// 模拟获取单个房间的详细信息
Mock.mock(/\/api\/rooms\/\d+/, 'get', (options) => {
  const room_id = parseInt(options.url.split('/').pop());
  return {
    code: 1,
    message: '房间信息获取成功',
    data: {
      id: room_id,
      name: '房间' + room_id,
      length: Mock.mock('@float(5000, 10000, 0, 2)'),
      width: Mock.mock('@float(5000, 10000, 0, 2)'),
      height: Mock.mock('@float(3000, 8000, 0, 2)'),
      positionX: Mock.mock('@float(0, 50, 1, 2)'),
      positionY: Mock.mock('@float(0, 50, 1, 2)'),
      positionZ: Mock.mock('@float(0, 50, 1, 2)'),
      containers: [
        {
          id: Mock.mock('@integer(1, 10)'),
          position_x: Mock.mock('@float(0, 50, 1, 2)'),
          position_y: Mock.mock('@float(0, 50, 1, 2)'),
          position_z: Mock.mock('@float(0, 50, 1, 2)'),
          length: Mock.mock('@float(100, 500, 1, 2)'),
          width: Mock.mock('@float(100, 500, 1, 2)'),
          height: Mock.mock('@float(100, 500, 1, 2)')
        }
      ]
    }
  };
});
// 创建房间接口
Mock.mock('/api/rooms', 'post', (options) => {
  const data = JSON.parse(options.body);
  if (!data.length || !data.width || !data.height) {
    return {
      code: 400,
      message: '房间尺寸错误'
    };
  }
  return {
    code: 1,
    data: {
      id: Mock.Random.integer(1, 1000),
      name: data.name || `房间${Mock.Random.integer(1, 100)}`,
      length: data.length,
      width: data.width,
      height: data.height,
      positionX: 0.0,
      positionY: 0.0,
      positionZ: 0.0,
    },
    message: '房间创建成功'
  };
});
// 模拟更新房间信息
Mock.mock(/\/api\/rooms/, 'put', (options) => {
  const requestBody = JSON.parse(options.body);
  return {
    code: 1,
    message: '房间信息修改成功',
    data: {
      id: requestBody.id,
      name: requestBody.name,
      length: requestBody.length,
      width: requestBody.width,
      height: requestBody.height,
      positionX: requestBody.positionX,
      positionY: requestBody.positionY,
      positionZ: requestBody.positionZ
    }
  };
});

Mock.mock('/api/containers', 'post', (options) => {
	const body = JSON.parse(options.body);
	// 验证请求参数
	if (!body.position_x || !body.position_y || !body.position_z || 
		!body.length || !body.width || !body.height || 
		!body.room_id|| !body.container_type_id || !body.container_feature || !body.container_feature.length) {
		return {
			code: 400,
			message: '请求参数错误'
		};
	}

	// 假设成功创建柜子
	return {
		code: 1,
		data: {
			id: Mock.Random.guid(),
			...body,
			container_feature: body.container_feature.map(feature => ({
				id: feature.id,
				feature: `特征${feature.id}`
			})),
			room: {
				id: body.room_id,
				name: '示例房间',
				length: 6000,
				width: 6000,
				height: 4000,
				positionX: 0,
				positionY: 0,
				positionZ: 0
			},
			container_type: {
				id: 1,
				type: '柜子'
			}
		},
		message: '柜子创建成功'
	};
});

// 查询房间信息
Mock.mock('/api/query-room', 'post', () => {
  return {
    code: 1,
    data: {
      rows: [{
        id: Mock.Random.integer(1, 1000),
        name: Mock.Random.ctitle(5, 10),
        length: 6000.0,
        width: 6000.0,
        height: 4000.0,
        positionX: 0.0,
        positionY: 0.0,
        positionZ: 0.0,
        container: [
          {
            id: 1,
            container_id: Mock.Random.integer(1, 1000),
            position_x: Mock.Random.float(0, 6000, 2, 2),
            position_y: Mock.Random.float(0, 6000, 2, 2),
            position_z: Mock.Random.float(0, 4000, 2, 2),
            length: Mock.Random.float(1000, 6000, 2, 2),
            width: Mock.Random.float(1000, 6000, 2, 2),
            height: Mock.Random.float(1000, 4000, 2, 2),
            parent_id: Mock.Random.integer(1, 1000),
            container_type: {
              id: 1,
              type: Mock.Random.word()
            },
            container_feature: [
              { id: 1, feature: Mock.Random.word() },
              { id: 2, feature: Mock.Random.word() }
            ],
            item: [
              {
                id: Mock.Random.integer(1, 1000),
                length: Mock.Random.float(1, 100, 2, 2),
                width: Mock.Random.float(1, 100, 2, 2),
                height: Mock.Random.float(1, 100, 2, 2),
                position_x: Mock.Random.float(0, 6000, 2, 2),
                position_y: Mock.Random.float(0, 6000, 2, 2),
                position_z: Mock.Random.float(0, 4000, 2, 2),
                quantity: Mock.Random.integer(1, 100),
                shape: {
                  id: Mock.Random.integer(1, 10),
                  shape: Mock.Random.word()
                },
                threshold: Mock.Random.integer(1, 100),
                container_id: Mock.Random.integer(1, 1000),
                feature: [
                  { id: 1, feature: Mock.Random.word() },
                  { id: 2, feature: Mock.Random.word() }
                ]
              }
            ]
          },
		  {
		    id: 1,
		    container_id: Mock.Random.integer(1, 1000),
		    position_x: Mock.Random.float(0, 6000, 2, 2),
		    position_y: Mock.Random.float(0, 6000, 2, 2),
		    position_z: Mock.Random.float(0, 4000, 2, 2),
		    length: Mock.Random.float(1000, 6000, 2, 2),
		    width: Mock.Random.float(1000, 6000, 2, 2),
		    height: Mock.Random.float(1000, 4000, 2, 2),
		    parent_id: Mock.Random.integer(1, 1000),
		    container_type: {
		      id: 1,
		      type: Mock.Random.word()
		    },
		    container_feature: [
		      { id: 1, feature: Mock.Random.word() },
		      { id: 2, feature: Mock.Random.word() }
		    ],
		    item: [
		      {
		        id: Mock.Random.integer(1, 1000),
		        length: Mock.Random.float(1, 100, 2, 2),
		        width: Mock.Random.float(1, 100, 2, 2),
		        height: Mock.Random.float(1, 100, 2, 2),
		        position_x: Mock.Random.float(0, 6000, 2, 2),
		        position_y: Mock.Random.float(0, 6000, 2, 2),
		        position_z: Mock.Random.float(0, 4000, 2, 2),
		        quantity: Mock.Random.integer(1, 100),
		        shape: {
		          id: Mock.Random.integer(1, 10),
		          shape: Mock.Random.word()
		        },
		        threshold: Mock.Random.integer(1, 100),
		        container_id: Mock.Random.integer(1, 1000),
		        feature: [
		          { id: 1, feature: Mock.Random.word() },
		          { id: 2, feature: Mock.Random.word() }
		        ]
		      }
		    ]
		  }
        ]
      }],
      totalRowCount: 10,
      totalPageCount: 1
    },
    message: "房间查询成功"
  };
});

// 查询容器信息
Mock.mock('/api/query-container', 'post', () => {
  return {
    code: 1,
    data: {
      rows: [
        {
          id: 1,
          container_id: Mock.Random.integer(1, 1000),
          position_x: Mock.Random.float(0, 6000, 2, 2),
          position_y: Mock.Random.float(0, 6000, 2, 2),
          position_z: Mock.Random.float(0, 4000, 2, 2),
          length: Mock.Random.float(1000, 6000, 2, 2),
          width: Mock.Random.float(1000, 6000, 2, 2),
          height: Mock.Random.float(1000, 4000, 2, 2),
          room: {
            id: Mock.Random.integer(1, 1000),
            name: Mock.Random.ctitle(5, 10),
            length: 6000.0,
            width: 6000.0,
            height: 4000.0,
            positionX: 0.0,
            positionY: 0.0,
            positionZ: 0.0
          },
          parent_id: Mock.Random.integer(1, 1000),
          container_type: {
            id: 1,
            type: Mock.Random.word()
          },
          container_feature: [
            { id: 1, feature: Mock.Random.word() },
            { id: 2, feature: Mock.Random.word() }
          ],
          item: [
            {
              id: Mock.Random.integer(1, 1000),
              length: Mock.Random.float(1, 100, 2, 2),
              width: Mock.Random.float(1, 100, 2, 2),
              height: Mock.Random.float(1, 100, 2, 2),
              position_x: Mock.Random.float(0, 6000, 2, 2),
              position_y: Mock.Random.float(0, 6000, 2, 2),
              position_z: Mock.Random.float(0, 4000, 2, 2),
              quantity: Mock.Random.integer(1, 100),
              shape: {
                id: Mock.Random.integer(1, 10),
                shape: Mock.Random.word()
              },
              threshold: Mock.Random.integer(1, 100),
              feature: [
                { id: 1, feature: Mock.Random.word() },
                { id: 2, feature: Mock.Random.word() }
              ]
            },
			{
			  id: Mock.Random.integer(1, 1000),
			  length: Mock.Random.float(1, 100, 2, 2),
			  width: Mock.Random.float(1, 100, 2, 2),
			  height: Mock.Random.float(1, 100, 2, 2),
			  position_x: Mock.Random.float(0, 6000, 2, 2),
			  position_y: Mock.Random.float(0, 6000, 2, 2),
			  position_z: Mock.Random.float(0, 4000, 2, 2),
			  quantity: Mock.Random.integer(1, 100),
			  shape: {
			    id: Mock.Random.integer(1, 10),
			    shape: Mock.Random.word()
			  },
			  threshold: Mock.Random.integer(1, 100),
			  feature: [
			    { id: 1, feature: Mock.Random.word() },
			    { id: 2, feature: Mock.Random.word() }
			  ]
			}
          ]
        }
      ],
      totalRowCount: 10,
      totalPageCount: 1
    },
    message: "查询容器信息成功"
  };
});

// 查询物品信息
Mock.mock('/api/query-item', 'post', () => {
  return {
    code: 1,
    data: {
      rows: [
        {
          id: Mock.Random.integer(1, 1000),
          length: Mock.Random.float(1, 100, 2, 2),
          width: Mock.Random.float(1, 100, 2, 2),
          height: Mock.Random.float(1, 100, 2, 2),
          position_x: Mock.Random.float(0, 6000, 2, 2),
          position_y: Mock.Random.float(0, 6000, 2, 2),
          position_z: Mock.Random.float(0, 4000, 2, 2),
          quantity: Mock.Random.integer(1, 100),
          shape: {
            id: Mock.Random.integer(1, 10),
            shape: Mock.Random.word()
          },
          threshold: Mock.Random.integer(1, 100),
          feature: [
            { id: 1, feature: Mock.Random.word() },
            { id: 2, feature: Mock.Random.word() }
          ],
          room: {
            id: Mock.Random.integer(1, 1000),
            name: Mock.Random.ctitle(5, 10),
            length: 6000.0,
            width: 6000.0,
            height: 4000.0,
            positionX: 0.0,
            positionY: 0.0,
            positionZ: 0.0
          }
        },
		{
		  id: Mock.Random.integer(1, 1000),
		  length: Mock.Random.float(1, 100, 2, 2),
		  width: Mock.Random.float(1, 100, 2, 2),
		  height: Mock.Random.float(1, 100, 2, 2),
		  position_x: Mock.Random.float(0, 6000, 2, 2),
		  position_y: Mock.Random.float(0, 6000, 2, 2),
		  position_z: Mock.Random.float(0, 4000, 2, 2),
		  quantity: Mock.Random.integer(1, 100),
		  shape: {
		    id: Mock.Random.integer(1, 10),
		    shape: Mock.Random.word()
		  },
		  threshold: Mock.Random.integer(1, 100),
		  feature: [
		    { id: 1, feature: Mock.Random.word() },
		    { id: 2, feature: Mock.Random.word() }
		  ],
		  room: {
		    id: Mock.Random.integer(1, 1000),
		    name: Mock.Random.ctitle(5, 10),
		    length: 6000.0,
		    width: 6000.0,
		    height: 4000.0,
		    positionX: 0.0,
		    positionY: 0.0,
		    positionZ: 0.0
		  }
		}
      ],
      totalRowCount: 1,
      totalPageCount: 2
    },
    message: "查询物品信息成功"
  };
});


// 模拟接口
Mock.mock('/api/fetchNotices', 'get', (options) => {
  return {
    code: 200,
    message: '获取通知成功',
    data: 'mockData' // 返回模拟数据
  };
});