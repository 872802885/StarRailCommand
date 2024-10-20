<script setup lang="ts">


import {onMounted, reactive, ref} from "vue";
import useClipboard from "vue-clipboard3";
import {ElMessage} from "element-plus";
import * as axios from "axios";

const doCopy = () => {
  myCopy('/giveall avatar r6 l80 ×1')
}
const doSkill = () => {
  myCopy('avatar talent -1 10')
}
const doWeapon = () => {
  myCopy('/giveall equipment r5 l80 ×1')
}
const changeWay = () => {
  myCopy('/hero type ' + myWay.value)
}

const suitForList = reactive<SubDetail[]>([])
const suitTwoList = reactive<SubDetail[]>([])
const currentSuit = reactive<any>({
  head: {subType: 1, mainType: 1, suitType: 2372, current: 6, sub: []},
  hand: {subType: 1, mainType: 1, suitType: 2372, current: 6, sub: []},
  body: {subType: 1, mainType: 1, suitType: 2372, current: 6, sub: []},
  shoes: {subType: 1, mainType: 1, suitType: 2372, current: 6, sub: []},
  ball: {subType: 1, mainType: 1, suitType: 3871, current: 6, sub: []},
  line: {subType: 1, mainType: 1, suitType: 3871, current: 6, sub: []}
})

const subList = ref([
  {title: '攻击力百分比', id: 1},
  {title: '速度', id: 2},
  {title: '击破特攻', id: 3},
  {title: '生命值', id: 4},
  {title: '生命值百分比', id: 5},
  {title: '攻击力', id: 6},
  {title: '防御力', id: 7},
  {title: '防御力百分比', id: 8},
  {title: '暴击率', id: 9},
  {title: '暴击伤害', id: 10},
  {title: '效果命中', id: 11},
  {title: '效果抵抗', id: 12},
])
const mainList = ref<any>({
  head: [{title: '生命值', id: 1}],
  hand: [{title: '攻击力', id: 1}],
  body: [
    {title: '生命值百分比', id: 1},
    {title: '攻击力百分比', id: 2},
    {title: '防御力百分比', id: 3},
    {title: '暴击率', id: 4},
    {title: '暴击伤害', id: 5},
    {title: '治疗量加成', id: 6},
    {title: '效果命中', id: 7},
  ],
  shoes: [
    {title: '生命值百分比', id: 1},
    {title: '攻击力百分比', id: 2},
    {title: '防御力百分比', id: 3},
    {title: '速度', id: 4},
  ],
  ball: [
    {title: '生命值百分比', id: 1},
    {title: '攻击力百分比', id: 2},
    {title: '防御力百分比', id: 3},
    {title: '物理属性伤害提高', id: 4},
    {title: '火属性伤害提高', id: 5},
    {title: '冰属性伤害提高', id: 6},
    {title: '雷属性伤害提高', id: 7},
    {title: '风属性伤害提高', id: 8},
    {title: '量子属性伤害提高', id: 9},
    {title: '虚数属性伤害提高', id: 10},
  ],
  line: [
    {title: '击破特攻', id: 1},
    {title: '能量恢复', id: 2},
    {title: '生命值百分比', id: 3},
    {title: '攻击力百分比', id: 4},
    {title: '防御力百分比', id: 5},
  ],
})

const idMap = reactive<any>({
  '3166': 6120,
  '3165': 6119,
  '2372': 6118,
  '2371': 6117,
  '1968': 6116,
  '1971': 6115,
  '1224': 6114,
  '1225': 6113,
  '572': 6112,
  '569': 6111,
  '570': 6110,
  '573': 6109,
  '568': 6108,
  '577': 6107,
  '579': 6106,
  '575': 6105,
  '576': 6104,
  '578': 6103,
  '574': 6102,
  '571': 6101,
  '3871': 6318,
  '3872': 6317,
  '3168': 6316,
  '3167': 6315,
  '2590': 6314,
  '2588': 6313,
  '1970': 6312,
  '1969': 6311,
  '1231': 6310,
  '1223': 6309,
  '585': 6308,
  '584': 6307,
  '581': 6306,
  '583': 6305,
  '580': 6304,
  '582': 6303,
  '587': 6302,
  '586': 6301,
})

const positionList = ref([
  'head', 'hand', 'body', 'shoes', 'ball', 'line'
])
const positionListCN = ref([
  '头盔', '手套', '躯干', '鞋子', '位面球', '位面绳'
])

const myCopy = async (data: string) => {
  const {toClipboard} = useClipboard()
  try {
    await toClipboard(data)
    ElMessage({
      message: "生成成功, 指令是" + data,
      type: 'success',
    })
  } catch (e) {
    ElMessage({
      message: '指令复制失败',
      type: 'error',
    })
  }
}
interface SubDetail{
  id: number,
  title: string,
  effect: string[],
  summary:string
}
onMounted(async () => {
  const {data} = await axios.default.get('/common/blackboard/sr_wiki/v1/home/content/list?app_sn=sr_wiki&channel_id=30')
  data.data.list[0].list.forEach((item:any) => {
    let target :SubDetail = {
      id: item.content_id,
      title: item.title,
      effect: JSON.parse(item.ext)['c_30']['table']['list'],
      summary: item.summary
    }
    if (target.effect.length > 1) {
      suitForList.push(target)
    } else {
      suitTwoList.push(target)
    }
  })
  console.log(suitTwoList)
  console.log(suitForList)
})

const getSuitList = (position:string) => {
  if (positionList.value.findIndex(v => v === position) > 3) {
    return suitTwoList
  } else {
    return suitForList
  }
}

const myWay = ref<string>('8001')

const delSub = (position:string, index:number) => {
  currentSuit[position].sub.splice(index, 1)
}

const addSub = (position:string) => {
  let obj = {
    num: currentSuit[position].current,
    id: currentSuit[position].subType,
    title: ' * ' + currentSuit[position].current
  }
  let index = currentSuit[position].sub.findIndex((v:any) => v.id === currentSuit[position].subType)
  if (index < 0) {
    if (currentSuit[position].sub.length > 3) {
      ElMessage({
        message: '遗器词条不建议超过4条',
        type: 'error',
      })
      return
    }
    currentSuit[position].sub.push(obj)
  } else {
    currentSuit[position].sub[index].num += obj.num
    currentSuit[position].sub[index].title = ' * ' + currentSuit[position].sub[index].num
  }
}

const copyCommand = (position:string, index:number) => {
  let baseStr = '/relic ' + idMap[currentSuit[position].suitType] + (index+1) + ' ' //61033 1 8:3 9:3 7:1 6:2 l3 x1'
  currentSuit[position].sub.forEach((v:any) => {
    baseStr += v.id + ':' + v.num + ' '
  })
  baseStr += 'x1'
  myCopy(baseStr)
}
</script>

<template>
  <el-row style="width: 1200px;margin: 0 auto;">
    <el-form :inline="true"
             style="width: 100%;padding: 15px;border-radius: 15px;margin-right:15px;background: #a4d2ff">
      <el-form-item label="获取所有满级角色" class="role-form-item">
        <el-button @click="doCopy">复制</el-button>
      </el-form-item>
      <el-form-item label="天赋拉满" class="role-form-item">
        <el-button @click="doSkill">复制</el-button>
      </el-form-item>
      <el-form-item label="获取所有满级满精光追" class="role-form-item">
        <el-button @click="doWeapon">复制</el-button>
      </el-form-item>
      <el-form-item label="获取所有满级角色" class="role-form-item">
        <el-button @click="doCopy">复制</el-button>
      </el-form-item>
      <el-form-item label="切换主角" class="role-form-item">
        <el-row style="width: 300px;">
          <el-col :span="16">
            <el-select v-model="myWay" style="margin-bottom: 10px">
              <el-option label="毁灭" value="8001"></el-option>
              <el-option label="存护" value="8003"></el-option>
              <el-option label="同协" value="8005"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-button @click="changeWay">复制</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <el-form v-for="(position,ii) in positionList"
             style="margin: 15px auto; width: 350px;padding: 15px;border-radius: 15px;background: #a4d2ff">
      <el-form-item label-position="top" :label="positionListCN[ii]" class="role-form-item">
        <el-select
            filterable
            placeholder="请选择..."
            clearable
            v-model="currentSuit[position].suitType"
        >
          <el-option v-for="item of getSuitList(position)" :key="item.id" :label="item.title" :value="item.id">
            {{ item.id }}
          </el-option>
        </el-select>
        <el-divider></el-divider>
        <el-form style="width: 100%" label-width="60">
          <el-form-item label="主属性">
            <el-select
                v-model="currentSuit[position].mainType"
            >
              <el-option
                  v-for="it in mainList[position]"
                  :key="it.id"
                  :label="it.title"
                  :value="it.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="副属性">
            <el-select
                v-model="currentSuit[position].subType"
            >
              <el-option
                  v-for="it in subList"
                  :key="it.id"
                  :label="it.title"
                  :value="it.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" " style="margin-top: 10px">
            <el-input-number v-model="currentSuit[position].current"></el-input-number>
            <el-button @click="addSub(position)">添加</el-button>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item v-for="(item,index) in currentSuit[position].sub" label=" ">
            <el-col :span="16">
              <el-text readonly>{{ subList[item.id - 1].title + item.title }}</el-text>
            </el-col>
            <el-col :span="8">
              <el-button style="margin-left: 3px" @click="delSub(position,index)">删除</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-row style="width: 100%;">
        <el-button style="margin: auto" type="primary" @click="copyCommand(position,ii)">生成指令</el-button>
      </el-row>
    </el-form>
  </el-row>
</template>

<style scoped>
.role-form-item {
  background: #8efff7;
  border-radius: 15px;
  padding: 15px
}
</style>