<template>
	<div>
		<div v-for="(item,index) in realData" :key="index">
			<ul v-if="item.children && item.children.length > 0" :key="index">
				<!-- 名称太长，添加tooltip -->
				 <el-tooltip v-if="item.label.length > 19" class="item" effect="dark"
						:content="item.label"  placement="top-start">
					<li @click.stop="handleItem(item)" :id="'_'+(item.value || item.id)">
						<div class="hover_div">
						<i class="el-icon-caret-bottom def hidden" @click.stop="handleShow"></i>
						{{ item.label }}
						</div>
						<Item :menuData="item.children"  @checkItem="handleCheckItem"/>
					</li>
				</el-tooltip>
				<!-- 名称正常 -->
					<li v-if="item.label.length <= 19" @click.stop="handleItem(item)" :id="'_'+(item.value || item.id)">
		<div class="hover_div"><i class="el-icon-caret-bottom def hidden"  @click.stop="handleShow"></i>
						{{ item.label }}
	</div>
						<Item :menuData="item.children"  @checkItem="handleCheckItem"/>
					</li>
			</ul>
			<ul v-else class="pdl16" :key="index">
				<!-- 名称太长，添加tooltip -->
<!--				{{item.label}}-->
				<el-tooltip v-if=" item.label.length > 19" class="item" effect="dark"
						:content="item.label"  placement="top-start">
					<li @click.stop="handleItem(item)" class="hover_div" :id="'_'+(item.value || item.id)">{{ item.label }}</li>
				</el-tooltip>
				<!-- 名称正常 -->
				<li v-if="item.label.length <= 19" class="hover_div" @click.stop="handleItem(item)" :id="'_'+(item.value || item.id)">{{ item.label }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default{
	name:'Item',
	data() {
	  return {
	    realData: []
		}
	},
	props:{
		menuData: Array
	},
	mounted(){
	  this.realData = this.menuData;
	},
	methods:{
		/**
		 * 点击箭头切换显示内容
		 * @param  {[type]} e [description]
		 * @return {[type]}   [description]
		 */
		handleShow(e){
			if(e.target.className=='el-icon-caret-bottom def hidden'){
				e.target.className='el-icon-caret-bottom show_sel_item';
			}else{
				e.target.className='el-icon-caret-bottom def hidden';
			}
		},
		/**
		 * 点击item
		 * @param  {[type]} item [description]
		 * @return {[type]}      [description]
		 */
		handleItem(item){
			this.$emit('checkItem',item);
		},
		/**
		 * 点击递归item
		 * @param  {[type]} val [description]
		 * @return {[type]}     [description]
		 */
		handleCheckItem(val){
			this.$emit('checkItem',val);
		}
	},
	watch: {
		menuData: function() {
			this.realData = this.menuData
		}
	}
}
</script>

<style scoped lang="scss">
.def{
	transform: rotate(-90deg);
}
.pdl16{
	text-indent: 18px;
}
.show_sel_item + div{
	display: block;
}
.hidden + div{
	display: none;
}
</style>
