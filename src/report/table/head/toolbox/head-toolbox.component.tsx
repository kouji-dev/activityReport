import {FC} from "react";
import {useHeadToolboxApi} from "@hooks/use-head-toolbox.hook";
import {Button, Popover, Space, Tooltip} from "antd";
import {CloseCircleTwoTone, SettingTwoTone} from "@ant-design/icons";

export const HeadToolbox: FC<{}> = () => {
    const { unselectAll } = useHeadToolboxApi();
    const content = (
        <Space.Compact block>
            <Tooltip title="Deselect All">
                <Button onClick={unselectAll} icon={<CloseCircleTwoTone />} />
            </Tooltip>
        </Space.Compact>
    );

    return (
        <div className="th toolbox-head">
            <Popover content={content}>
                <div className="toolbox-head-container">
                    <SettingTwoTone />
                </div>
            </Popover>
        </div>
    );
};