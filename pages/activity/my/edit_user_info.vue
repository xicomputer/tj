<template>
	<view>
		<view v-if="edit_type=='name'">
			<u-field
				v-model="name"
				label="名称"
				placeholder="请填写名称"
			>
			</u-field>
		</view>
		<view v-if="edit_type=='intro'">
			<u-field
				v-model="intro"
				placeholder="请填写简介"
				label-width="0"
				placeholder-style="text-align: left;"
				type="textarea"
			>
			</u-field>
		</view>
		<view class="is-footer layer5 flex-col align-center">
		  <button class="block1 flex-col align-center" @click="save">
		    <text class="word6">保存</text>
		  </button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				edit_type_desc: {
					name: '编辑名称',
					intro: '编辑简介'
				},
				edit_type: '',
				name: '',
				intro: ''
			}
		},
		eventChannel: null,
		onLoad(e) {
			this.eventChannel = this.getOpenerEventChannel();
			this.edit_type = e.type;
			this[e.type] = e.value;
			uni.setNavigationBarTitle({
			    title: this.edit_type_desc[this.edit_type]
			});
		},
		
		methods: {
			save() {
				this.eventChannel.emit('ephor',this[this.edit_type]);
				this.$u.route({type: 'back'})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/pages/tabbar/activity/common.scss';
.is-footer {
	width: 100%;
	height: 131rpx;
	position: fixed;
	bottom: 0;
}
.layer5 {
	height: 131rpx;
	background-color: rgba(255, 255, 255, 1);
	padding-top: 19rpx;
	width: 750rpx;
	.block1 {
		height: 79rpx;
		border-radius: 6px;
		background-color: rgba(253, 111, 45, 1);
		width: 702rpx;
		.word6 {
			width: 68rpx;
			display: block;
			overflow-wrap: break-word;
			color: rgba(255, 255, 255, 1);
			font-size: 34rpx;
			white-space: nowrap;
			text-align: justify;
		}
	}
}
</style>
