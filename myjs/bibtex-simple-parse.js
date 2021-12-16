// 作者：pt27@live.cn
// 日期：2021.12.12
// 数据结构参考 https://github.com/ORCID/bibtexParseJs
// 感谢 浩宇 提供奇怪的有一些语法错误但是又不影响使用的 BiBTeX 样本
class bibtex_simple_parser {
    static bibtex2json(data) {
        var pos = 0;
        var bewteen_braces = '';
        var entries = new Array();
        // Match @
        function _matchAt() {
            while(data.length > pos && data[pos] != '@') {
                pos++;
            };
            if(data[pos] == '@') {
                return true;
            };
            return false;
        };
        // remove comment
        function remove_comment(txt) {
            return txt.replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '').replace(/(?:^|\n|\r)\s*%.*(?:\r|\n|$)/g, '').replace(/(?:^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/g, '');
        }
        // get_entry_type
        function _get_entry_type() {
            if(data[pos] != '@') {
                throw "_get_entry_type ERROR 1";
            }
            var start_pos = pos + 1;
            var max_loop = 100;
            while(data.length > pos && data[pos] != '{') {
                max_loop--;
                if(max_loop<0){
                    throw "_get_entry_type ERROR 2"
                }
                pos++;
            } // 此时 pos 应该在 { 处
            var end_pos = pos;
            return data.substring(start_pos, end_pos).replace(/(^\s*)|(\s*$)/g,"");
        }
        // 判断是否是空白字符
        function isWhitespace(s) {
            return (s == ' ' || s == '\r' || s == '\t' || s == '\n');
        };
        // 获取指定花括号之间的内容
        function get_bewteen_braces(txt, internal_pos){
            var max_white_space = 1024;
            for(let loop=0; loop<max_white_space; loop++) {
                if(txt[internal_pos] == '{') {
                    break;
                } else if (txt[internal_pos] == null) {
                    return [null, null];
                } else if(isWhitespace(txt[internal_pos])) {
                    // 空白字符或者逗号都可以忽略
                    internal_pos++;
                } else {
                    // 应该执行不到这里
                    throw "get_bewteen_braces ERROR 2"
                }
            }

            // max_white_space 超限
            if(txt[internal_pos] != '{') {
                throw "get_bewteen_braces ERROR 3";
            }
            
            var start_pos = internal_pos + 1;
            var lb = 1;
            var rb = 0;
            var max_loop = 8192;
            while(lb != rb) {
                max_loop--;
                if(max_loop<0) {
                    // 内容超限
                    throw "get_bewteen_braces ERROR 4";
                }
                // 先增加
                internal_pos++;
                if(txt[internal_pos] == '{') {
                    lb++;
                } else if (txt[internal_pos] == '}') {
                    rb++;
                }
            }
            var end_pos = internal_pos;
            // 返回内容，坐标（ } 后第一个字符）
            return [txt.substring(start_pos, end_pos), internal_pos + 1];
        };
        
        // 反方向查找一个单词
        function find_word_minus(txt, internal_pos) {
            return txt.substring(0, internal_pos).match(/\w+\s*$/)[0];
        }

        function bewteenbraces_handler(bbtxt) {
            var citation_key = '';
            var entryTags = new Object();
            var internal_pos = 0;

            // citation_key
            var max_loop = 128;
            while(bbtxt[internal_pos] != ',') {
                // 这个逗号是必须的
                max_loop--;
                if(max_loop<0) {
                    // 循环超限
                    throw "bewteenbraces_handler ERROR 1";
                }
                citation_key = citation_key + bbtxt[internal_pos];
                internal_pos++;
            } // 此时 Internal_pos 应该在 `,` 处

            // citationTags
            // 寻找等号
            var equs = new Array();
            var lb = 0;
            var rb = 0;
            var entry_name = '';
            var value = '';
            while(bbtxt.length > internal_pos) {
                if (bbtxt[internal_pos] == '{') {
                    lb++;
                } else if (bbtxt[internal_pos] == '}'){
                    rb++;
                } else if (lb == rb && bbtxt[internal_pos] == '='){
                    equs.push(internal_pos)
                }
                internal_pos++;
            }
            equs.forEach(equ_pos => {
                entry_name = find_word_minus(bbtxt, equ_pos);
                value = get_bewteen_braces(bbtxt, equ_pos + 1)[0];
                entry_name = entry_name.replace(/(^\s*)|(\s*$)/g, "");
                value = value.replace(/(^\s*)|(\s*$)/g, "");
                entryTags[entry_name] = value;
            });
            return [citation_key, entryTags];
        };
        // main
        data = remove_comment(data);
        while(_matchAt()){
            var entry_type = _get_entry_type();
            [bewteen_braces, pos] = get_bewteen_braces(data, pos);
            var key;
            var tags;
            var entry = new Object();
            [key, tags] = bewteenbraces_handler(bewteen_braces);
            if (key == null || tags == null){
                break;
            }
            entry['citationKey'] = key;
            entry['entryType'] = entry_type;
            entry['entryTags'] = tags;
            entries.push(entry);
        }
        return entries;
    };
    static json2bibtex(json, compact) {
        if (compact === undefined) compact = true;
        var out = '';
        
        var entrysep = ',';
        var indent = '';
        if (!compact) {
		      entrysep = ',\n';
		      indent = '    ';        
        }
        for ( var i in json) {
            out += "@" + json[i].entryType;
            out += '{';
            if (json[i].citationKey)
                out += json[i].citationKey + entrysep;
            if (json[i].entry)
                out += json[i].entry ;
            if (json[i].entryTags) {
                var tags = indent;
                for (var jdx in json[i].entryTags) {
                    if (tags.trim().length != 0)
                        tags += entrysep + indent;
                    tags += jdx + (compact ? '={' : ' = {') + 
                            json[i].entryTags[jdx] + '}';
                }
                out += tags;
            }
            out += compact ? '}\n' : '\n}\n\n';
        }
        return out;
    };
}
