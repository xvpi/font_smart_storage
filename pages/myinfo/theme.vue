<!-- <template>
	<view style="display: flex; margin-left: 5px; margin-top: 20px;">
		<view style="flex: 1; display: flex; flex-direction: column; align-items: center;">
			<image src="/static/test/1.png" style="width: 150px; height: 250px;"></image>
			<text style="margin-top: 10px;">xxx</text>
		</view>
		<view style="flex: 1; display: flex; flex-direction: column; align-items: center; margin-left: 1px;">
			<image src="/static/test/2.png" style="width: 150px; height: 250px;"></image>
			<text style="margin-top: 10px;">xxx</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style> -->

<template>
  <view class="container">
    <!-- 添加 Item -->
    <view class="section">
      <text>添加 Item</text>
      <input v-model="addForm.name" placeholder="请输入 Item 名称" />
      <button @click="addItem">添加</button>
    </view>

    <!-- 查询 Item -->
    <view class="section">
          <text>查询 Item</text>
          <u-input v-model="queryForm.name" placeholder="请输入查询名称" />
          <u-input v-model.number="queryForm.page" placeholder="页码" type="number" />
          <u-input v-model.number="queryForm.pageSize" placeholder="每页数量" type="number" />
          <button @click="queryItem">查询</button>
        </view>
    
         <!-- 查询结果 -->
            <view class="section">
              <text>查询结果</text>
              <view v-if="queryResult.length" class="result-list">
                <view v-for="item in queryResult" :key="item.id" class="result-item">
                  <view class="item-card">
                    <text class="item-id">ID: {{ item.id }}</text>
                    <text class="item-name">名称: {{ item.name }}</text>
                    <text class="item-container">容器: {{ item.container }}</text>
                    <u-button @click="openEditModal(item)" size="mini">编辑</u-button>
                  </view>
                </view>
              </view>
              <text v-else>暂无数据</text>
            </view>
    
        <!-- 编辑弹窗 -->
        <u-modal v-model="showEditModal" title="编辑名称" @confirm="confirmEdit">
          <u-input v-model="editForm.name" placeholder="请输入新名称" />
        </u-modal>
		
	<!-- 删除 Item -->
	<view class="section">
	    <!-- 输入框和添加按钮 -->
		<text>删除 Item</text>
	    <input v-model="inputId" placeholder="请输入要删除的ID" type="number" />
	    <button @click="addId">添加</button>
	
	    <!-- 显示已添加的ID标签 -->
	    <view class="tags">
	      <view class="tag" v-for="(id, index) in itemIds" :key="index">
	        <text>{{ id }}</text>
	        <u-icon name="close" @click="removeId(index)"></u-icon>
	      </view>
	    </view>
	
	    <!-- 确认删除按钮 -->
	    <button @click="deleteItem">确认删除</button>
	  </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      addForm: { name: '' },
	  editForm: { id: '' ,name: ''},
      queryForm: {name:"",page: 0, pageSize: 16 },
      queryResult: [],
	  showEditModal: false, // 是否显示编辑弹窗
	  inputId: '', // 输入框中的ID
	  itemIds: [] // 存储已添加的ID数组
    };
  },
  methods: {
    async addItem() {
      const token = uni.getStorageSync('token');
      if (!token) return uni.showToast({ title: '请先登录', icon: 'none' });
      
      const [error, res] = await uni.request({
        url: 'http://napbad.com:8080/item/add',
        method: 'POST',
        header: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        data: { name: this.addForm.name }
      });
      console.log(res);
      if (res.statusCode === 200) {
        uni.showToast({ title: '添加成功', icon: 'success' });
      } else {
        uni.showToast({ title: '添加失败', icon: 'none' });
      }
    },
	// 添加ID到数组
	    addId() {
	      if (this.inputId) {
	        this.itemIds.push(this.inputId);
	        this.inputId = ''; // 清空输入框
			console.log(this.itemIds);
	      }
	    },
	    // 从数组中移除ID
	    removeId(index) {
	      this.itemIds.splice(index, 1);
		  console.log(this.itemIds);
	    },
async deleteItem() {
      const token = uni.getStorageSync('token');
      if (!token) return uni.showToast({ title: '请先登录', icon: 'none' });
        // 将 itemIds 数组转换为查询参数格式
        const queryParams = this.itemIds.map(id => `itemIds=${id}`).join('&');
      
        // 拼接完整的 URL
        const url = `http://napbad.com:8080/item/delete?${queryParams}`;
      const [error, res] = await uni.request({
        url: url,
        method: 'POST',
        header: { 'Authorization': `Bearer ${token}`},
        //data: { itemIds: this.itemIds.map(id => parseInt(id)) }
      });
	  console.log(url);
	  console.log(this.itemIds);
      console.log(res);
      if (res.statusCode === 200) {
        uni.showToast({ title: '删除成功', icon: 'success' });
		this.itemIds = []; // 清空已添加的ID
      } else {
        uni.showToast({ title: '删除失败', icon: 'none' });
      }
    },    
    async queryItem() {
      const token = uni.getStorageSync('token');
      if (!token) return uni.showToast({ title: '请先登录', icon: 'none' });
      
      const [error, res] = await uni.request({
        url: 'http://napbad.com:8080/item/query',
        method: 'POST',
        header: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        data: {name: this.queryForm.name,page:this.queryForm.page, pageSize:this.queryForm.pageSize}
      });
      console.log(res);
      if (res.statusCode === 200) {
        this.queryResult = res.data.rows || [];
		this.queryPageCount = res.data.totalPageCount;
      } else {
        uni.showToast({ title: '查询失败', icon: 'none' });
      }
    },
	// 打开编辑弹窗
	    openEditModal(item) {
	      this.editForm.id = item.id;
	      this.editForm.name = item.name;
	      this.showEditModal = true;
	    },
	
	    // 确认编辑
	    async confirmEdit() {
	      if (!this.editForm.name) {
	        return uni.showToast({ title: '名称不能为空', icon: 'none' });
	      }
	
	      const token = uni.getStorageSync('token');
	      if (!token) return uni.showToast({ title: '请先登录', icon: 'none' });
	
	      const [error, res] = await uni.request({
	        url: 'http://napbad.com:8080/item/update',
	        method: 'POST',
	        header: {
	          'Authorization': `Bearer ${token}`,
	          'Content-Type': 'application/json'
	        },
	        data: {
	          id: this.editForm.id,
	          name: this.editForm.name,
	        },
	      });
		   if (res.statusCode === 200) {
		          uni.showToast({ title: '更新成功', icon: 'success' });
		          this.showEditModal = false;
		          this.queryItem(); // 重新查询数据
		        } else {
		          uni.showToast({ title: '更新失败', icon: 'none' });
		        }
		      }
			  
  }
};
</script>

<style>
.tags {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.tag {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.tag u-icon {
  margin-left: 5px;
  cursor: pointer;
}
.container {
  padding: 20px;
}

.section {
  margin-bottom: 20px;
}

.input {
  margin-bottom: 10px;
}

.result-list {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  gap: 10px; /* 卡片之间的间距 */
}

.result-item {
  flex: 1 1 calc(50% - 10px); /* 每行两个，减去间距 */
  box-sizing: border-box;
}

.item-card {
  padding: 15px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.item-id,
.item-name,
.item-container 
{
  display: block;
  margin-bottom: 5px;
}

.item-id {
  font-weight: bold;
  color: #333;
}

.item-name {
  color: #666;
}

.item-container {
  color: #999;
}
</style>
