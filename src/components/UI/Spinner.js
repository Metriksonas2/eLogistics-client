import { Oval } from "react-loader-spinner";

const Spinner = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Oval
                height={80}
                width={80}
                color="#212529"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#212529"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    );
}

export default Spinner;