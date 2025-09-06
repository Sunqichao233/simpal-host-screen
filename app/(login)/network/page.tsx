'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NetworkSelectionPage } from "./compomemts/NetworkSelectionPage";
import { WiFiSetupPage } from "./compomemts/WiFiSetupPage";
import { LANSetupPage } from "./compomemts/LANSetupPage";
import { ConnectionConfirmationPage } from "./compomemts/ConnectionConfirmationPage";

type PageType = "selection" | "wifi" | "lan" | "confirmation";
type ConnectionStatus = "connecting" | "success" | "failed";

interface WiFiNetwork {
  ssid: string;
  signalStrength: number;
  isProtected: boolean;
  isConnected: boolean;
}

export default function App() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<PageType>("selection");
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");
  const [selectedNetwork, setSelectedNetwork] = useState<WiFiNetwork | null>(null);
  const [connectionType, setConnectionType] = useState<"wifi" | "lan">("wifi");

  // Navigation handlers
  const handleSelectWifi = () => {
    setConnectionType("wifi");
    setCurrentPage("wifi");
  };

  const handleSelectLAN = () => {
    setConnectionType("lan");
    setCurrentPage("lan");
  };

  const handleBackToSelection = () => {
    setCurrentPage("selection");
    setSelectedNetwork(null);
  };

  const handleWiFiConnect = (network: WiFiNetwork, password?: string) => {
    setSelectedNetwork(network);
    setConnectionStatus("connecting");
    setCurrentPage("confirmation");

    // Simulate connection attempt
    setTimeout(() => {
      // Randomly simulate success/failure for demo purposes
      const success = Math.random() > 0.2; // 80% success rate
      setConnectionStatus(success ? "success" : "failed");
    }, 3000);
  };

  const handleLANConnect = () => {
    setConnectionStatus("connecting");
    setCurrentPage("confirmation");

    // Simulate connection attempt
    setTimeout(() => {
      // Randomly simulate success/failure for demo purposes
      const success = Math.random() > 0.1; // 90% success rate
      setConnectionStatus(success ? "success" : "failed");
    }, 2000);
  };

  const handleRetry = () => {
    if (connectionType === "wifi" && selectedNetwork) {
      handleWiFiConnect(selectedNetwork);
    } else if (connectionType === "lan") {
      handleLANConnect();
    }
  };

  const handleBackFromConfirmation = () => {
    if (connectionType === "wifi") {
      setCurrentPage("wifi");
    } else {
      setCurrentPage("lan");
    }
  };

  const handleContinue = () => {
    // 网络设置完成，跳转到员工登录页面
    router.push('/?from=network');
  };

  // Render current page
  switch (currentPage) {
    case "selection":
      return (
        <NetworkSelectionPage
          onSelectWifi={handleSelectWifi}
          onSelectLAN={handleSelectLAN}
        />
      );

    case "wifi":
      return (
        <WiFiSetupPage
          onBack={handleBackToSelection}
          onConnect={handleWiFiConnect}
        />
      );

    case "lan":
      return (
        <LANSetupPage
          onBack={handleBackToSelection}
          onConnect={handleLANConnect}
        />
      );

    case "confirmation":
      return (
        <ConnectionConfirmationPage
          status={connectionStatus}
          networkName={selectedNetwork?.ssid}
          connectionType={connectionType}
          onRetry={handleRetry}
          onBack={handleBackFromConfirmation}
          onContinue={handleContinue}
        />
      );

    default:
      return null;
  }
}