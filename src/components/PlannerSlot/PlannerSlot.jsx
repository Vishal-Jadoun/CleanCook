import './PlannerSlot.css';

function PlannerSlot({type,meal}){
    return (
        <div className="plan">
            <span className="time">
                {type}
            </span>
            <span className="item">
                {meal}
            </span>
        </div>
    );
}

export default PlannerSlot;