import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface ConnectionConfirmationPageProps {
  status: "connecting" | "success" | "failed";
  networkName?: string;
  connectionType: "wifi" | "lan";
  onRetry: () => void;
  onBack: () => void;
  onContinue: () => void;
}

export function ConnectionConfirmationPage({
  status,
  networkName,
  connectionType,
  onRetry,
  onBack,
  onContinue,
}: ConnectionConfirmationPageProps) {
  
  const getStatusDisplay = () => {
    switch (status) {
      case "connecting":
        return {
          icon: <RotateCcw className="w-16 h-16 text-primary animate-spin" />,
          title: "Connecting...",
          description: `Establishing ${connectionType === "wifi" ? "Wi-Fi" : "LAN"} connection`,
          bgColor: "bg-muted/50",
        };
      case "success":
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-600" />,
          title: "Network Connected",
          description: `Successfully connected ${networkName ? `to ${networkName}` : "via ethernet"}`,
          bgColor: "bg-green-50 dark:bg-green-900/20",
        };
      case "failed":
        return {
          icon: <XCircle className="w-16 h-16 text-red-600" />,
          title: "Connection Failed",
          description: `Unable to connect ${networkName ? `to ${networkName}` : "via ethernet"}. Please try again.`,
          bgColor: "bg-red-50 dark:bg-red-900/20",
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-primary mb-2">SIMPAL POS System</h1>
        </div>
        <h2 className="text-3xl font-semibold text-foreground">Network Setup</h2>
        <p className="text-muted-foreground mt-2">Connection status</p>
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-md bg-card shadow-lg border-border">
        <CardHeader className="pb-4">
          <h2 className="text-xl font-medium text-center">Connection Status</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Status Display */}
          <div className={`rounded-lg p-8 text-center ${statusDisplay.bgColor}`}>
            <div className="flex justify-center mb-6">
              {statusDisplay.icon}
            </div>
            <h3 className="text-xl font-medium mb-3">{statusDisplay.title}</h3>
            <p className="text-muted-foreground">{statusDisplay.description}</p>
          </div>

          {/* Action Buttons */}
          {status !== "connecting" && (
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 h-12"
                onClick={status === "failed" ? onRetry : onBack}
              >
                {status === "failed" ? (
                  <>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retry
                  </>
                ) : (
                  "Back"
                )}
              </Button>
              
              {status === "success" && (
                <Button
                  className="flex-1 h-12 bg-primary hover:bg-primary/90"
                  onClick={onContinue}
                >
                  Continue
                </Button>
              )}
            </div>
          )}

          {status === "connecting" && (
            <Button
              variant="outline"
              className="w-full h-12"
              disabled
            >
              <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
              Connecting...
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}