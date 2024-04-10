// 编辑器所需要的样式文件
import 'codemirror/lib/codemirror.css'

// 语言模式：根据不同的代码语言引入不同的js，你可以到 node_modules/codemirror/mode/ 下寻找需要的文件
import "codemirror/mode/javascript/javascript"

// 主题样式：代码块的主题，你可以到 node_modules/codemirror/theme/ 下寻找需要的文件
import 'codemirror/theme/idea.css'

// 附加功能：某些高级功能需要引入额外的 js 文件，你可以在 node_modules/codemirror/addon 下查找
// 代码折叠
import 'codemirror/addon/fold/foldgutter.css'
// 激活行高亮
import "codemirror/addon/selection/active-line.js"
// 其他