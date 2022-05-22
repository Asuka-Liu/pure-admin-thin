import { h, defineComponent } from "vue";
import { Icon as IconifyIcon, addIcon } from "@iconify/vue/dist/offline";

//ant-design icons
import barsOutlined from "@iconify-icons/ant-design/bars-outlined";
import tagsOutlined from "@iconify-icons/ant-design/tags-outlined";
import appstoreFilled from "@iconify-icons/ant-design/appstore-filled";
import appstoreOutlined from "@iconify-icons/ant-design/appstore-outlined";
import appstoreAddOutlined from "@iconify-icons/ant-design/appstore-add-outlined";
import questionCircleOutlined from "@iconify-icons/ant-design/question-circle-outlined";
import userOutlined from "@iconify-icons/ant-design/user-outlined";
import userAddOutlined from '@iconify-icons/ant-design/user-add-outlined';

addIcon("user-outlined", userOutlined); //用户列表
addIcon("user-add-outlined", userAddOutlined); //添加用户
addIcon("bar-outlined", barsOutlined); //通知公告
addIcon("tag-outlined", tagsOutlined); //分类编辑
addIcon("appstore-filled", appstoreFilled); //软件管理
addIcon("appstore-outlined", appstoreOutlined); //软件管理-现有
addIcon("appstore-add-outlined", appstoreAddOutlined); //软件管理-添加
addIcon("question-circle-outlined", questionCircleOutlined); //关于

// element-plus icon
import Check from "@iconify-icons/ep/check";
import HomeFilled from "@iconify-icons/ep/home-filled";
import Setting from "@iconify-icons/ep/setting";
import Lollipop from "@iconify-icons/ep/lollipop";
import RefreshRight from "@iconify-icons/ep/refresh-right";
import ArrowDown from "@iconify-icons/ep/arrow-down";
import CloseBold from "@iconify-icons/ep/close-bold";
import Bell from "@iconify-icons/ep/bell";
import Search from "@iconify-icons/ep/search";
import plusIcon from '@iconify-icons/ep/plus';
addIcon("check", Check);
addIcon("home-filled", HomeFilled);
addIcon("setting", Setting);
addIcon("lollipop", Lollipop); //用户管理
addIcon("refresh-right", RefreshRight);
addIcon("arrow-down", ArrowDown);
addIcon("close-bold", CloseBold);
addIcon("bell", Bell);
addIcon("search", Search);
addIcon("plus", plusIcon);
// remixicon
import ArrowRightSLine from "@iconify-icons/ri/arrow-right-s-line";
import ArrowLeftSLine from "@iconify-icons/ri/arrow-left-s-line";
import LogoutCircleRLine from "@iconify-icons/ri/logout-circle-r-line";
import InformationLine from "@iconify-icons/ri/information-line";
import ArrowUpLine from "@iconify-icons/ri/arrow-up-line";
import ArrowDownLine from "@iconify-icons/ri/arrow-down-line";
import Bookmark from "@iconify-icons/ri/bookmark-2-line";
import User from "@iconify-icons/ri/user-3-fill";
import Lock from "@iconify-icons/ri/lock-fill";
import More2Fill from "@iconify-icons/ri/more-2-fill";
addIcon("arrow-right-s-line", ArrowRightSLine);
addIcon("arrow-left-s-line", ArrowLeftSLine);
addIcon("logout-circle-r-line", LogoutCircleRLine);
addIcon("information-line", InformationLine);
addIcon("arrow-up-line", ArrowUpLine);
addIcon("arrow-down-line", ArrowDownLine);
addIcon("bookmark", Bookmark);
addIcon("user", User);
addIcon("lock", Lock);
addIcon("more-vertical", More2Fill);

// Iconify Icon在Vue里离线使用（用于内网环境）https://docs.iconify.design/icon-components/vue/offline.html
export default defineComponent({
  name: "IconifyIcon",
  components: { IconifyIcon },
  props: {
    icon: {
      type: String,
      default: ""
    }
  },
  render() {
    const attrs = this.$attrs;
    return h(
      IconifyIcon,
      {
        icon: `${this.icon}`,
        ...attrs
      },
      {
        default: () => []
      }
    );
  }
});
