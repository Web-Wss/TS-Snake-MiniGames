class Snake{
  // 表示蛇头的元素
  head:HTMLElement
  // 蛇的身体（包括蛇头）
  bodies:HTMLCollection
  // 获取蛇的容器
  element:HTMLElement

  constructor(){
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake>div")!;
    this.bodies = this.element.getElementsByTagName('div')!;

  }

  // 获取蛇的坐标
  get X(){
    return this.head.offsetLeft
  }

  // 获取蛇的Y轴坐标
  get Y(){
    return this.head.offsetTop
  }

  // 设置蛇头的坐标
  set X(value:number){
    // 如果新值和旧值相同，则直接返回不修改
    if(this.X === value){
      return
    }
    // x的值合法范围0-290
    if(value < 0 || value > 290){
      // 进入判断说明撞墙
      throw new Error('蛇撞墙了')
    }
    // 修改x时，蛇在左右移动，判断是否调头了
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      if (value > this.X) {
        // 如果新值大于旧值，说明向右走，此时发生掉头，应该继续让蛇向左走
        value = this.X - 10
      }else{
         value = this.X + 10
      }
      
    }

    // 移动身体
    this.moveBody()
    this.head.style.left = value + 'px'
    this.checkHeadBody()
  }

  set Y(value:number){
    // 如果新值和旧值相同，则直接返回不修改
    if(this.Y === value){
      return
    }
    if(value < 0 || value > 290){
      // 进入判断说明撞墙
      throw new Error('蛇撞墙了')
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
         value = this.Y - 10
      }else{
         value = this.Y + 10
      }
      
    }
        // 移动身体
        this.moveBody()
    this.head.style.top = value + 'px'
    // 检查是否撞到自己
    this.checkHeadBody()
  }

  // 蛇增加身体的方法
  addBody(){
    // 向element中添加div
    this.element.insertAdjacentHTML("beforeend","<div></div>")
  }

  // 添加一个蛇身体移动方法
  moveBody(){
    // 将后边的身体设置为前面身体的位置
    /**
     * 第4节 -> 第3节
     * 第3节 -> 第2节
     * 第2节 -> 蛇头
     */
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前面身体的位置
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";

      
    }
  }

  checkHeadBody(){
    // 获取所有的身体，检查是否和蛇头坐标发生重贴
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement
      if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
        // 进入说蛇头撞到了身体
        throw new Error("撞到自己了")
      }
  }

}
}

export default Snake