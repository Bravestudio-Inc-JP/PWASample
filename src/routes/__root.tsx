import { AppShell, Burger, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAB, IconCamera, IconHome2, IconLink } from "@tabler/icons-react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { ReactElement, lazy } from "react";

interface LinkWrapperProps {
    href: string;
    children: ReactElement;
    className?: string;
}

const LinkWrapper = (props: LinkWrapperProps): ReactElement => (
    <Link to={props.href} className={props.className}>
        {props.children}
    </Link>
);

const Devtools =
    process.env.NODE_ENV === "production"
        ? (): null => null // Render nothing in production
        : lazy(() => import("@tanstack/router-devtools").then((m) => ({
            default: m.TanStackRouterDevtools,
        }))
        );

const RouteElement = (): ReactElement => {
    const [open, { toggle }] = useDisclosure();

    return (
        <>
            <AppShell
                header={{ height: 60 }}
                navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: !open } }}
            >
                <AppShell.Header>
                    <Group h="100%" px="md">
                        <Burger opened={open} onClick={toggle} hiddenFrom="sm" size="sm" />
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar p="md">
                    <NavLink
                        href="/"
                        label="Home"
                        component={LinkWrapper}
                        leftSection={<IconHome2 size="1rem" stroke={1.5} />}
                    />
                    
                    <NavLink
                        href="/parameter"
                        component={LinkWrapper}
                        label="Parameter"
                        leftSection={<IconAB size="1rem" stroke={1.5} />}
                    />
                    <NavLink
                        href="/link-test"
                        component={LinkWrapper}
                        label="Link Test"
                        leftSection={<IconLink size="1rem" stroke={1.5} />}
                    />
                    <NavLink
                        href="/webrtc"
                        component={LinkWrapper}
                        label="WebRTC"
                        leftSection={<IconCamera size="1rem" stroke={1.5} />}
                    />
                    <NavLink
                        href="/pdf-test"
                        component={LinkWrapper}
                        label="PDF Test"
                        leftSection={<IconAB size="1rem" stroke={1.5} />}
                    />
                </AppShell.Navbar>
                <AppShell.Main>
                    <Outlet />
                </AppShell.Main>
            </AppShell>
            <Devtools />
        </>
    );
};
export const Route = createRootRoute({
    component: RouteElement
});