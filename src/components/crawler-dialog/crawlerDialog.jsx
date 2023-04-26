import React from "react";
import TextField from "@mui/material/TextField";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import postCrawlingRequest from "../../api/postCrawlingRequest";
import Loading from "react-loading";

const CrawlerDialog = ({ openCrawlerDialog, setOpenCrawlerDialog }) => {
    const urlRef = React.useRef("");
    const pagesRef = React.useRef(0);
    const [showLoading, setShowLoading] = React.useState(false);
    const [timeLoading, setTimeLoading] = React.useState(0);

    React.useEffect(() => {
        let intervalId = null;
        if (showLoading) {
            intervalId = setInterval(
                () => setTimeLoading(timeLoading + 1),
                1000
            );

            return () => clearInterval(intervalId);
        } else {
            setTimeLoading(0);
        }
    }, [showLoading, timeLoading]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
        const secondsDisplay =
            remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${minutesDisplay}:${secondsDisplay}`;
    };

    const handleClickCloseDialog = (event, reason) => {
        if (showLoading && reason && reason === "backdropClick") {
            return;
        }

        setOpenCrawlerDialog(false);
    };

    const handleSubmitCrawlingRequest = async () => {
        try {
            setShowLoading(true);
            await postCrawlingRequest(
                urlRef.current.value,
                pagesRef.current.value
            );
            setOpenCrawlerDialog(false);
        } catch (error) {
            console.log(error);
        } finally {
            setShowLoading(false);
        }
    };

    return (
        <Dialog open={openCrawlerDialog} onClose={handleClickCloseDialog}>
            <DialogTitle
                variant="h5"
                children={
                    !showLoading
                        ? "Crawler"
                        : `Time taken: ${formatTime(timeLoading)}`
                }
            />
            <DialogContent>
                {!showLoading && (
                    <>
                        <Typography
                            children={
                                "To crawl the websites, please enter the seed url and number of pages to crawl."
                            }
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="url"
                            label="url"
                            type="url"
                            fullWidth
                            variant="filled"
                            inputRef={urlRef}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="pages"
                            label="pages"
                            type="number"
                            fullWidth
                            variant="filled"
                            inputRef={pagesRef}
                        />
                    </>
                )}
                {showLoading && (
                    <div style={{ marginTop: "10px" }}>
                        <Loading
                            type={"spin"}
                            height={"100%"}
                            width={"100%"}
                            color={"Chocolate"}
                        />
                    </div>
                )}
            </DialogContent>

            {!showLoading && (
                <DialogActions>
                    <Button
                        onClick={handleClickCloseDialog}
                        children={"Cancel"}
                    />
                    <Button
                        onClick={handleSubmitCrawlingRequest}
                        children={"Submit"}
                    />
                </DialogActions>
            )}
        </Dialog>
    );
};

export default CrawlerDialog;
