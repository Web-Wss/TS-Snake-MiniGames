// 引入其他类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePannel";

// 游戏的控制器
class GameControl{
  // 定义三个属性
  // 蛇
  snake:Snake
  // 食物
  food:Food
  // 记分牌
  scorePanel:ScorePanel

  // 创建一个属性来存储蛇的移动方向（按键的方向）
  direction: string = ""
  // 创建一个属性用来记录游戏是否结束
  isLive = true

  constructor(){
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()

    this.init()
  }

  // 游戏初始化，调用后游戏开始
  init(){
    // 绑定键盘按下事件
    document.addEventListener('keydown',this.keydownHandler.bind(this))

    // 调用run方法，使蛇移动
    this.run()

  }

  /**
   *
   * ArrowUp
    ArrowDown
    ArrowLeft
    ArrowRight
   */
  // 创建一个键盘按下的响应函数
  keydownHandler(event: KeyboardEvent){
    // 需要检查event.key的值是否合法
    // 修改direction
    this.direction = event.key
  }


  // 创建一个控制蛇移动的方法
  run(){
    /**
     * 根究方向（this.direction）来使蛇的位置改变
     * 向上 top 减少
     * 向下 top 增加
     * 向左 left 减少
     * 向右 left 增加
     */
    // 获取蛇现在坐标
    let X = this.snake.X;
    let Y = this.snake.Y;


    // 根据按键方向来修改X值和Y值
    switch (this.direction) {
        case "ArrowUp":
        case "Up":
            // 向上移动 top 减少
            Y -= 10;
            break;
        case "ArrowDown":
        case "Down":
            // 向下移动 top 增加
            Y += 10;
            break;
        case "ArrowLeft":
        case "Left":
            // 向左移动 left 减少
            X -= 10;
            break;
        case "ArrowRight":
        case "Right":
            // 向右移动 left 增加
            X += 10;
            break;
    }
    // 检查是否吃到了食物
    this.checkEat(X,Y)

    // 修改蛇的x和y值
    try{
      this.snake.X = X;
      this.snake.Y = Y; 
    }catch(e){
      alert(e+'GAME OVER!')
      this.isLive = false
    }


     // 开启一个定时调用
     this.isLive && setTimeout(this.run.bind(this), 300 -(this.scorePanel.level-1)*30);
  }

  // 定义一个方法，用来检测蛇是否吃到食物
  checkEat(X:number,Y:number){
    if( X === this.food.X && Y === this.food.Y){
      // 食物位置重置
      this.food.change()
      // 分数增加
      this.scorePanel.addScore()
      // 蛇要加一节
      this.snake.addBody()
    }
  }



}

export default GameControl