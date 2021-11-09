    import React from "react";
    import "./fullpage.css";
    import PubSub from 'pubsub-js' //引入消息订阅
    // import { throttle } from "utils/loadash"; //暂不节流

    //

    class Fullpage extends React.Component {

        // componentDidMount() {
        //     console.log(this.state.currentPage);
        // }
        // componentDidUpdate(){ //发布消息   当state状态更新就发布消息
        //     const result = this.state.currentPage;//当前的页码
        //     // PubSub.publish('page',result)
        //     // console.log(result);
        //     if(result===2){
        //         PubSub.publish('page',result)
        //         // this.setState({result: result});
        //         // console.log('wdww')
        //     }
        // }
        componentDidMount(){
            PubSub.subscribe('toppage',(msg,data)=>{ //快速跳回顶部
                const currentPage = this.state.currentPage
                this.setState({currentPage:data})
                
                
                // this.setState({data:toppage})
                // console.log('什么',toppage)
                // console.log(data)//固定的页码数
                // console.log(this.aa)
            })
        }



    constructor(props) {
        super(props);
        this.state = {
        currentPage: 1,
        pageList: this.props.children,
        };

        this.initPageListFromPropsChildren(); // 类似于vue的插槽，props带过来的children（FullpageItem）
        // this.handleScroll = throttle(this.handleScroll, 600, true); //屏幕滚动时的节流函数
    }
    debounceHandleScroll = (e) => {
        e.persist();
        this.handleScroll(e);
        // console.log(e)
    };
    changeCurrentPage(index) {
        this.setState({ currentPage: index });
    }
    handleScroll(e) {
        const result = this.state.currentPage
        if (e.deltaY > 0) {  
            PubSub.publish('page',result+1)
            // console.log(e.deltaY,'鼠标往下滚动了')
            // console.log(this.state.currentPage)-------------------------------------------
        if (this.state.currentPage === this.state.pageList.length) return;
        this.changeCurrentPage(this.state.currentPage + 1);
        } else {
            // console.log(e.deltaY,'鼠标往上滚动了')
            PubSub.publish('page',result-1)
        if (this.state.currentPage === 1) return;
        this.changeCurrentPage(this.state.currentPage - 1);
        }
    }
    initPageListFromPropsChildren() {
        // 初始化pageList（插槽）
        if (this.state.pageList === undefined) this.setState({ pageList: [] });
        if (
        typeof pageList === "object" &&
        this.state.pageList.length === undefined
        )
        this.setState({ pageList: [this.state.pageList] });
    }
    render() {
            return (
                <div className="fullpage">
                    <div className="fullpage_container" onWheel={this.debounceHandleScroll}>
                    {this.state.pageList.map((x, i) => (
                    <div
                        className={`fullpage_item item_${i + 1}`}
                        key={i}
                        style={{
                        top: -this.state.currentPage + i + 1 + "00vh",
                        }}
                    >
                        {x}
                    </div>
                    ))}
                    <div className="point_nav">
                    {this.state.pageList.map((x, i) => (
                        <div
                        className="point_nav_item"
                        style={{
                            background:
                            i + 1 === this.state.currentPage ? "#333" : "#cccaca",
                        }}
                        key={i}
                        onMouseEnter={() => this.changeCurrentPage(i + 1)}
                        ></div>
                    ))}
                    </div>
                </div>
                </div>
                
            );
            }
        }
    const FullpageItem = (props) => {
    let { children } = props;
    return <div style={{ height: "100%", width: "100%" }}>{children}</div>;
    };
    export { Fullpage, FullpageItem };