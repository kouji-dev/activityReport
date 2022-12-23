import {FC, memo} from "react";
import {Id} from "@utils/types";
import {useSelector} from "react-redux";
import {projectByReportIdSelector} from "@project/project.selectors";
import {Typography} from "antd";

export const RowContext: FC<{ reportId: Id }> = memo((props) => {
    const { reportId } = props;
    const project = useSelector(
        projectByReportIdSelector(reportId)
    );

    if (!project) return <td>empty</td>;

    const { nom } = project;
    return (
        <div className="td context-cell">
            <Typography.Text strong>{nom}</Typography.Text>
        </div>
    );
});