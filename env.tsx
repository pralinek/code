<Target Name="CopyEnvFile" AfterTargets="Build">
  <Copy SourceFiles="$(MSBuildProjectDirectory)\build\.env" DestinationFolder="$(MSBuildProjectDirectory)\$(SpaRoot)" />
</Target>